import styled from 'styled-components'
import IntlCurrencyInput from 'react-intl-currency-input'

interface ItemProps {
  checked?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* overflow-x: auto; */
  /* overflow-y: hidden; */

  .ps__rail-x {
    bottom: 500px;
  }

  /* .ps {
    margin-bottom: -250px;
    padding-bottom: 250px;
  } */
`

export const MenuContainer = styled.ul<{ width: string }>`
  display: flex;
  justify-content: space-evenly;
  height: 40px;
  min-width: ${e => e.width};
  border: 2px solid rgba(94, 118, 250, 0.26);
  border-radius: 10px;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e => e.theme.palette.secondary.dark};

  @media screen and (min-width: 768px) {
    height: 60px;
  }
`

export const DropdownItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  padding: 0 20px;
  height: 100%;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:after {
    content: '\\25b2\\A\\25bc';
    line-height: 11px;
    font-size: 12px;
    color: ${e => e.theme.palette.secondary.main};
    width: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    right: 0;
    padding-right: 5px;
    height: 25px;
    border-right: 1px solid ${e => e.theme.palette.primary.main};

    @media screen and (min-width: 768px) {
      height: 40px;
    }
  }

  &:nth-last-child(-n+2) {
    &:after {
      border: none;
    }
  }
`

export const ItemsContainer = styled.div`
  position: absolute;
  top: 56px;
  /* float: left; */
  /* height: 500px; */
  z-index: 2;
  padding-top: 4px;
  cursor: auto;
  white-space: nowrap;
`

export const Items = styled.ul<{show: boolean}>`
  list-style: none;
  display: ${e => e.show ? 'block' : 'none'};
  background-color: ${e => e.theme.palette.white.main};
  /* height: 200px; */
  padding: 15px 10px;
  border-radius: 16px;
  box-shadow: 0px 5px 30px rgba(101, 101, 101, 0.15);
`

export const Item = styled.li<ItemProps>`
  display: flex;
  align-items: center;
  color: ${e => e.checked ? e.theme.palette.primary.main : e.theme.palette.secondary.dark};
  height: 40px;
  border-bottom: 1px solid ${e => e.theme.palette.secondary.light};

  &:last-child {
    border: none;
  }

  input[type='checkbox'] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  .fakeCheckbox {
    width: 20px;
    height: 20px;
    border: 2px solid ${e => e.theme.palette.borderGray};
    color: ${e => e.theme.palette.borderGray};
    border-radius: 3px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    &:before {
      content: '\\2713';
      display: ${e => e.checked ? 'block' : 'none'};
    }
  }
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 20px;
`

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  label {
    text-align: left;
    text-indent: 8px;
    font-size: 16px;
    font-weight: normal;
    color: ${e => e.theme.palette.primary.main};
    margin-bottom: 3px;
  }
`

export const StyledInputMoney = styled(IntlCurrencyInput).attrs(() => ({
  currency: 'BRL',
  config: {
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
    locale: "pt-BR"
  }
}))`
  background-position: calc(100% - 35px) 50% !important;
  width: 100%;
  height: 20px;
  border: none;
  border-bottom: 1px solid ${e => e.theme.palette.secondary.light};
  text-indent: 8px;
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  color: ${e => e.theme.palette.secondary.dark};

  &::placeholder {
    color: ${e => e.theme.palette.secondary.main};
  }

  &:focus{
    outline: none;
  }

  @media screen and (min-width: 768px) {
    text-indent: 8px;
    height: 30px;
  }
`

export const StyledInput = styled.input`
  background-position: calc(100% - 35px) 50% !important;
  width: 100%;
  min-width: 180px;
  height: 20px;
  border: none;
  border-bottom: 1px solid ${e => e.theme.palette.secondary.light};
  text-indent: 8px;
  font-size: 16px;
  font-weight: bold;
  padding: 0 35px 0 0;
  overflow: hidden;
  color: ${e => e.theme.palette.secondary.main};

  &:focus{
    outline: none;
  }

  @media screen and (min-width: 768px) {
    text-indent: 8px;
    height: 30px;
  }
`

export const InputIcon = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 15px;
  mask: url('/assets/icons/search.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.secondary.main};
  width: 25px;
  height: 25px;
/*
  &:hover, &:active {
    cursor: pointer;
  } */

  @media screen and (min-width: 768px) {
    height: 25px;
  }
`

export const CalendarContainer = styled.div`
  /* display: flex; */
`

export const DateInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    /* background-position: calc(100% - 35px) 50% !important; */
    width: 150px;
    /* min-width: 180px; */
    /* height: 20px; */
    border: none;
    border: 1px solid ${e => e.theme.palette.secondary.dark};
    /* text-indent: 8px; */
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding: 0;
    /* padding: 0 35px 0 0; */
    /* overflow: hidden; */
    color: ${e => e.theme.palette.secondary.main};
  }

  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export const FilterButton = styled.button`
  width: 150px;
  height: 100%;
  background-color: ${e => e.theme.palette.primary.main};
  color: ${e => e.theme.palette.white.main};
  margin: 0;
  padding: 0;
  margin-left: 25px;
  border-radius: 10px;
  box-shadow: 1px 2px 4px #BDBABA;
`

export const SelectedFiltersContainer = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: ${e => e.width};
  height: 70px;
  border: 1px dashed ${e => e.theme.palette.borderGray};
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px;

  @media screen and (min-width: 768px) {
    height: 100px;
  }
`

export const SelectedFilters = styled.div`
  display: flex;
  /* width: 100%; */
  height: 100%;
  flex-wrap: wrap;
`

export const FilterItem = styled.div`
  background-color: ${e => e.theme.palette.secondary.light};
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 15px;
  margin-right: 26px;
  font-size: 14px;
  font-weight: 500;
  color: ${e => e.theme.palette.secondary.dark};
  /* position: relative; */
`

export const CloseFilterItem = styled.button`
  color: ${e => e.theme.palette.primary.main};
  /* position: absolute; */
  /* right: 10px; */
  margin-left: 15px;
  font-weight: normal;
`

export const ClearButton = styled.button`
  background-color: ${e => e.theme.palette.secondary.lightButton};
  border: 1px solid ${e => e.theme.palette.borderGray};
  border-radius: 10px;
  color: ${e => e.theme.palette.white.main};
  width: 130px;
  height: 50px;
  align-self: center;
`
