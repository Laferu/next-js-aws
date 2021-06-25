import {
  useEffect,
  useCallback,
  useState,
  useContext
} from 'react'
import {
  usersServerSideProps
} from '@/serverSideFunctions/pages/users'
import {
  // format,
  formatISO
} from 'date-fns'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

import formatMoney from '@/utils/formatMoney';
import { useGetQuery } from '@/hooks/useRest'
import Header from "@/components/Header"
import SEO from "@/components/SEO"
import Sidebar from "@/components/Sidebar"
import DropdownFilter from '@/components/DropdownFilter'
import {
  Wrapper,
  StyledMain,
  Title,
  ResponsiveTable,
  TrLink,
  PaginateContainer,
  ShadowBox,
  TableContainer
} from "@/styles/GlobalStyles"
import {
  StyledHeader,
  TableWrapper,
  TitleContainer
} from '@/styles/pages/users'
import TableErrorBoundary from '@/components/TableErrorBoundary'
import Loading from '@/components/Loading'
import { GlobalContext } from '@/utils/Context'
import PerfectScrollbar from '@/components/PerfectScrollbar'
import { cpfMask } from '@/utils/masks'

import { IFilterCategoryList } from '@/Interfaces/IDropdownList'
import { IUserData } from '@/Interfaces/users'

const Users = ({ profile }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [listFilterMenu, setListFilterMenu] = useState<IFilterCategoryList[]>([])
  const {
    url,
    state: {
      usersData,
      setUsersData,
      setUserData
    }
  } = useContext(GlobalContext)
  const router = useRouter()

  const filterMenuInitialValues = useCallback(() => {
    setListFilterMenu([
      {
        name: 'Status',
        fieldName: 'status',
        type: 'select',
        value: null,
        list: [
          {
            name: 'Ativo',
            checked: false,
            fieldValue: true
          },
          {
            name: 'Inativo',
            checked: false,
            fieldValue: false
          }
        ]
      },
      {
        name: 'Cliente',
        fieldName: 'name',
        type: 'search',
        value: ''
      },
      {
        name: 'CPF/CNPJ',
        fieldName: 'document',
        type: 'search',
        format: 'cpf',
        value: ''
      },
      // {
      //   name: 'Saldo',
      //   fieldName: 'amount',
      //   type: 'search',
      //   format: 'money',
      //   value: [null, null]
      // }
    ])
  }, [])

  const getUsers = useGetQuery('users')

  const createQueries = useCallback(() => {
    const filters: IFilterCategoryList[] = listFilterMenu || usersData.filters
    return filters.reduce((acc, crr) => {
      if (crr.value) {
        return {
          ...acc,
          [crr.fieldName]: crr.value
        }
      }
      if (crr.fieldName === 'status') {
        const status = crr.list.filter(e => e.checked === true)
        if (status.length === crr.list.length) {
          return acc
        }
        if (status.length > 0) {
          return {
            ...acc,
              status: status.map(e => e.fieldValue).toString()
          }
        }
      }

      return acc
    }, {})
  }, [listFilterMenu])

  const getData = useCallback(async (
    selected: number = 0,
    noReset: boolean = false,
    queries: Object = {}
  ) => {
    setIsLoading(true)

    try {
      const limit = 10
      const usersList = await getUsers.refetch({
        limit,
        starting_after: limit * selected,
        queryParams: { ...queries, with_balance: true }
      })

      if (usersList.data.length === 0) {
        if (usersData.users.length > 0 && noReset) {
          setUsersData(e => ({
            ...e,
            pageCount: e.pageCount - 1
          }))
          setIsLoading(false)
          return
        }
        setIsLoading(false)
      } else {
        setUsersData(e => ({
          ...e,
          currentPage: selected
        }))

        if (
          selected + 1 >= usersData.pageCount &&
          usersList.data.length === limit
        ) {
          setUsersData(e => ({
            ...e,
            pageCount: e.pageCount + 1
          }))
        }
      }

      setUsersData(e => ({
        ...e,
        users: usersList.data
      }))

      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.log(error)
      setUsersData(e => ({
        ...e,
        users: []
      }))
      setIsError(true)
      setIsLoading(false)
    }
  }, [usersData.filters, listFilterMenu, usersData.pageCount, usersData.users])

  const initialData = useCallback(async () => {
    if (usersData.users.length === 0) {
      try {
        await getData(0, true)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const nextData = useCallback(async (evt) => {
    try {
      const data = createQueries()
      await getData(evt.selected, true, data)
    } catch (error) {
      console.log(error)
    }
  }, [getData, createQueries])

  const filterAction = useCallback(async () => {
    try {
      const data = createQueries()
      await getData(0, false, data)
    } catch (error) {
      console.log(error)
    }
  }, [getData, createQueries])

  const goToUserTransactions = useCallback((evt: IUserData) => {
    setUserData(evt)
    router.push(`${url.baseUrl}/users/${evt.id}`)
  }, [])

  useEffect(() => {
    filterMenuInitialValues()
    initialData()
  }, [initialData, filterMenuInitialValues])

  return (
    <>
      <SEO
        title='Swipe - Histórico de Transações'
        shouldExcludeTitleSuffix
        image='logo.png'
        shouldIndexPage={false}
      />
      <Header profile={profile.data} />
      <Wrapper>
        <PerfectScrollbar>
          <StyledMain>
            <StyledHeader>
              <TitleContainer>
                <Title>Usuários</Title>
              </TitleContainer>
              <DropdownFilter
                state={{
                  list: listFilterMenu,
                  setList: setListFilterMenu
                }}
                action={filterAction}
                width='700px'
              />
            </StyledHeader>
            <ShadowBox className='mt-40'>
              <TableContainer>
                <TableErrorBoundary>
                  <Loading
                    isLoading={isLoading}
                    errorMessage='Não foi possível exibir os dados.'
                    isError={isError}
                  >
                    <TableWrapper>
                      <PerfectScrollbar id='history-transaction-chart'>
                        <ResponsiveTable>
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Cliente</th>
                              <th>CPF/CNPJ</th>
                              <th>Saldo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {history.map((e, index) => (
                              <TrLink
                                key={index}
                                onClick={() => goToTransactionDetails(e)}
                              >
                                <td data-label='Status'>
                                  <Icon status={e.status} />
                                </td>
                                <td data-label='Data'>{e.date}</td>
                                <td data-label='Id da transação'>
                                  {e.id}
                                </td>
                                <td data-label='Tipo de transação'>{e.methodType}</td>
                                <td data-label='Valor'>{e.value}</td>
                                <td data-label='Cliente'>Junior Lima</td>
                                <td data-label='CPF'>451.xxx.xxx-xx</td>
                              </TrLink>
                            ))} */}
                            {console.log(usersData)}
                            {usersData.users.map((e, index) => (
                              <TrLink
                                key={index}
                                onClick={() => goToUserTransactions(e)}
                              >
                                <td data-label='Status'>
                                  {e.status}
                                </td>
                                <td data-label='Cliente'>{e.name}</td>
                                <td data-label='CPF/CNPJ'>
                                  {cpfMask(e.document).formatedValue}
                                </td>
                                <td data-label='Saldo'>{formatMoney(e.amount)}</td>
                              </TrLink>
                            ))}
                          </tbody>
                        </ResponsiveTable>
                      </PerfectScrollbar>
                    </TableWrapper>
                  </Loading>
                </TableErrorBoundary>
                <PaginateContainer>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}

                    forcePage={usersData.currentPage}
                    pageCount={usersData.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={nextData}
                  />
                </PaginateContainer>
              </TableContainer>
            </ShadowBox>
          </StyledMain>
        </PerfectScrollbar>
        <Sidebar />
      </Wrapper>
    </>
  )
}

export default Users

export const getServerSideProps = usersServerSideProps
