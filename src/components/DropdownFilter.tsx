import React, {
  useState,
  useCallback
} from 'react'
import { format, add, isValid } from 'date-fns'
import Calendar from 'react-calendar'

import formatMoney from '@/utils/formatMoney'
import { cpfMask } from '@/utils/masks'
import {
  Container,
  MenuContainer,
  DropdownItem,
  FilterButton,
  InputContainer,
  ItemsContainer,
  Items,
  Item,
  StyledInputMoney,
  StyledInput,
  InputIcon,
  CalendarContainer,
  DateInputsContainer,
  SelectedFiltersContainer,
  SelectedFilters,
  FilterItem,
  CloseFilterItem,
  ClearButton,
  InputsContainer
} from '@/styles/components/DropdownFilter'
import PerfectScrollbar from './PerfectScrollbar'
import {
  IFilterCategoryList
} from '@/Interfaces/IDropdownList'
interface IDropdownFilterProps {
  state: {
    list: IFilterCategoryList[]
    setList: React.Dispatch<React.SetStateAction<IFilterCategoryList[]>>
  },
  action: Function,
  width: string
}

const DropdownFilter = ({
  state: {
    list,
    setList
  },
  action,
  width
}: IDropdownFilterProps) => {
  const [dropdown, setDropdown] = useState({
    index: null,
    indexFocus: null
  })

  const filterButtonAction = useCallback(() => action(), [action])

  const handleDropdown = useCallback(value => {
    setDropdown(e => ({ ...e, index: value }))
  }, [])

  const handleFocus = useCallback(value => {
    setDropdown(e => ({ ...e, indexFocus: value }))
  }, [])

  const handleCheckbox = useCallback((evt, menuIndex, itemIndex) => {
    setList(e => {
      const data = [...e]
      data[menuIndex].list[itemIndex].checked = evt.target.checked

      return data
    })
  }, [])

  const handleText = useCallback((evt, index, format = null, arr = null) => {
    setList(e => {
      const data = [...e]
      if (format === 'cpf') {
        data[index].value = cpfMask(evt).value

        return data
      }

      if (format === 'money') {
        if (arr === 0) {
          data[index].value[0] = evt
        }

        if (arr === 1) {
          data[index].value[1] = evt
        }

        return data
      }

      data[index].value = evt

      return data
    })
  }, [])

  const handleDate = useCallback((evt, index) => {
    setList(e => {
      const data = [...e]
      data[index].value = evt
      data[index].date = evt

      return data
    })
  }, [])

  const handleFirstDate = useCallback((evt, index) => {
    const dateEvt = add(new Date(evt), {
      days: 1
    })
    if (!isValid(dateEvt)) {
      return
    }
    setList(e => {
      const data = [...e]

      if (dateEvt > data[index].date[1]) {
        return data
      }

      if (!data[index].value) {
        data[index].value = []
      }

      data[index].value[0] = dateEvt
      data[index].value[1] = data[index].value[1] || new Date()
      data[index].date[0] = dateEvt
      data[index].date[1] = data[index].date[1] || new Date()

      return data
    })
  }, [])

  const handleSecondDate = useCallback((evt, index) => {
    if (new Date(evt) > new Date()) {
      return
    }
    const dateEvt = add(new Date(evt), {
      days: 1
    })
    if (!isValid(dateEvt)) {
      return
    }
    setList(e => {
      const data = [...e]

      if (dateEvt < data[index].date[0]) {
        return data
      }

      if (!data[index].value) {
        data[index].value = []
      }

      data[index].value[1] = dateEvt
      data[index].value[0] = data[index].value[0] || new Date()
      data[index].date[1] = dateEvt
      data[index].date[0] = data[index].date[0] || new Date()

      return data
    })
  }, [])

  const closeFilter = useCallback(async index => {
    setList(e => {
      const data = [...e]

      if (e[index].type === 'select' && e[index]?.list && e[index]?.list.length > 0) {
        const dataItem = e[index].list.map(item => {
          item.checked = false

          return item
        })
        data[index].list = dataItem

        return data
      }

      if (e[index].type === 'search') {
        if (e[index].format === 'money') {
          e[index].value[0] = null
          e[index].value[1] = null
        } else {
          e[index].value = ''
        }

        return data
      }

      if (e[index].type === 'date') {
        e[index].value = null
        e[index].date = [
          new Date(),
          new Date()
        ]

        return data
      }

      return []
    })

    await action()
  }, [action])

  const clearFilters = useCallback(async () => {
    setList(e => {
      const data = [...e]
      e.map((item, index) => {
        if (item.type === 'select' && item?.list && item?.list.length > 0) {
          const newList = item.list.map(drop => {
            drop.checked = false

            return drop
          })

          data[index].list = newList
        }
        if (item.type === 'search') {
          if (e[index].format === 'money') {
            item.value[0] = null
            item.value[1] = null
          } else {
            item.value = ''
          }
        }
        if (item.type === 'date') {
          item.value = null
          item.date = [
            new Date(),
            new Date()
          ]
        }
        return []
      })

      return data
    })

    await action()
  }, [action])

  return (
    <Container>
      <PerfectScrollbar
        style={{
          paddingBottom: 500,
          marginBottom: -500
        }}
        options={{
          wheelPropagation: true
        }}
      >
        <MenuContainer width={width}>
          {list.map((e, menuIndex) => (
            <DropdownItem
              key={menuIndex}
              onMouseOver={() => handleDropdown(menuIndex)}
              onMouseLeave={() => handleDropdown(null)}
            >
              {e.name}
              <ItemsContainer>
                <Items show={menuIndex === dropdown.index
                  || menuIndex === dropdown.indexFocus}>
                  {e.type === 'select' && e.list && e.list.map((drop, itemIndex) => (
                    <Item
                      key={itemIndex}
                      checked={drop.checked}
                    >
                      <input
                        type='checkbox'
                        id={`${drop.name}-${menuIndex}-${itemIndex}`}
                        onChange={e => handleCheckbox(e, menuIndex, itemIndex)}
                        checked={drop.checked}
                      />
                      <label
                        htmlFor={`${drop.name}-${menuIndex}-${itemIndex}`}
                        className='fakeCheckbox'
                      />
                      <label htmlFor={`${drop.name}-${menuIndex}-${itemIndex}`}>
                        {drop.name}
                      </label>
                    </Item>
                  ))}
                  {e.type === 'search' && e.format && e.format === 'money' && (
                    <InputsContainer>
                      <InputContainer>
                        <label>De</label>
                        <StyledInputMoney
                          onChange={(event, value) => handleText(value, menuIndex, e.format, 0)}
                          value={e.value[0]}
                          onFocus={() => handleFocus(menuIndex)}
                          onBlur={() => handleFocus(null)}
                        />
                        <InputIcon />
                      </InputContainer>
                      <InputContainer>
                        <label>Até</label>
                        <StyledInputMoney
                          onChange={(event, value) => handleText(value, menuIndex, e.format, 1)}
                          value={e.value[1]}
                          onFocus={() => handleFocus(menuIndex)}
                          onBlur={() => handleFocus(null)}
                        />
                        <InputIcon />
                      </InputContainer>
                    </InputsContainer>
                  )}
                  {e.type === 'search' && e.format !== 'money' && (
                    <InputContainer>
                      <StyledInput
                        type='text'
                        onChange={evt => handleText(evt.target.value, menuIndex, e.format)}
                        value={e.format === 'cpf' ? cpfMask(e.value).formatedValue : e.value}
                        onFocus={() => handleFocus(menuIndex)}
                        onBlur={() => handleFocus(null)}
                      />
                      <InputIcon />
                    </InputContainer>
                  )}
                  {e.type === 'date' && (
                    <CalendarContainer
                      // onMouseOver={() => handleFocus(menuIndex)}
                      // onMouseOut={() => handleFocus(null)}
                    >
                      <DateInputsContainer>
                        <input
                          type='date'
                          value={e.date.length > 0
                            ? format(e.date[0] || null, 'yyyy-MM-dd')
                            : ''
                          }
                          onChange={(evt) => {
                            handleFirstDate(evt.target.value, menuIndex)
                          }}
                          max={format(e.date.length > 1 ? e.date[1] : new Date(), 'yyyy-MM-dd')}
                          onFocus={() => handleFocus(menuIndex)}
                          onBlur={() => handleFocus(null)}
                        />
                        <p>até</p>
                        <input
                          type='date'
                          value={e.date.length > 1
                            ? format(e.date[1] || null, 'yyyy-MM-dd')
                            : ''
                          }
                          onChange={(evt) => {
                            handleSecondDate(evt.target.value, menuIndex)
                          }}
                          min={format(e.date.length > 0 ? e.date[0] : new Date('1970-02-02'), 'yyyy-MM-dd')}
                          max={format(new Date(), 'yyyy-MM-dd')}
                          onFocus={() => handleFocus(menuIndex)}
                          onBlur={() => handleFocus(null)}
                        />
                      </DateInputsContainer>
                      <Calendar
                        maxDate={new Date()}
                        returnValue='range'
                        selectRange={true}
                        onChange={(evt: Date[]) => handleDate(evt, menuIndex)}
                        value={e.date}
                        // onMouseOver={() => handleDropdown(menuIndex)}
                        // onMouseOut={() => handleDropdown(null)}
                      />
                    </CalendarContainer>

                  )}
                </Items>
              </ItemsContainer>
            </DropdownItem>
          ))}
          <FilterButton onClick={filterButtonAction}>Filtrar</FilterButton>
        </MenuContainer>
        <SelectedFiltersContainer width={width}>
          <SelectedFilters>
            {list.map((menuItem, menuIndex) => {
              if (menuItem.type === 'select' && menuItem?.list) {
                const hasFilter = menuItem.list.filter(e => e.checked)
                const filters = menuItem.list.length === hasFilter.length
                  ? 'Todos'
                  : hasFilter.map((dropItem) => dropItem.name)
                if (hasFilter.length > 0) {
                  return (
                    <FilterItem key={menuIndex}>
                      {menuItem.name + ': ' + filters.toString().replaceAll(',', ', ')}
                      <CloseFilterItem
                        onClick={() => closeFilter(menuIndex)}
                      >
                        X
                      </CloseFilterItem>
                    </FilterItem>
                  )
                }
              }
              if (menuItem.type === 'search' && menuItem?.value) {
                if (menuItem.format === 'money' && (!menuItem.value[0] || !menuItem.value[1])) {
                  return null
                }
                const value = menuItem.format === 'money' && menuItem.value[0] && menuItem.value[1]
                  ? formatMoney(Number(menuItem.value[0]), {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  }) + ' - ' + formatMoney(Number(menuItem.value[1]), {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                  : menuItem.format === 'cpf' ? cpfMask(menuItem.value).formatedValue :  menuItem.value
                return (
                  <FilterItem key={menuIndex}>
                    {menuItem.name + ': ' + value}
                    <CloseFilterItem
                      onClick={() => closeFilter(menuIndex)}
                    >
                      X
                    </CloseFilterItem>
                  </FilterItem>
                )
              }
              if (menuItem.type === 'date' && menuItem?.value?.length) {
                const value = format(menuItem.value[0], 'dd/MM/yyyy') === format(menuItem.value[1], 'dd/MM/yyyy')
                  ? format(menuItem.value[0], 'dd/MM/yyyy')
                  : `${format(menuItem.value[0], 'dd/MM/yyyy')} - ${format(menuItem.value[1], 'dd/MM/yyyy')}`
                return (
                  <FilterItem key={menuIndex}>
                    {menuItem.name + ': ' + value}
                    <CloseFilterItem
                      onClick={() => closeFilter(menuIndex)}
                    >
                      X
                    </CloseFilterItem>
                  </FilterItem>
                )
              }
            })}
          </SelectedFilters>
          <ClearButton onClick={clearFilters}>Limpar</ClearButton>
        </SelectedFiltersContainer>
      </PerfectScrollbar>
    </Container>
  )
}

export default DropdownFilter
