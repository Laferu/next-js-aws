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

// import formatMoney from '@/utils/formatMoney';
// import { useGetQuery } from '@/hooks/useRest'
import Header from "@/components/Header"
import SEO from "@/components/SEO"
import Sidebar from "@/components/Sidebar"
import DropdownFilter from '@/components/DropdownFilter'
import {
  Wrapper,
  StyledMain,
  Title,
  // ScrollableTableContainer,
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

import usersJson from './users.json'
import { IFilterCategoryList } from '@/Interfaces/IDropdownList'

const Users = ({ profile }) => {
  // const [history, setHistory] = useState<IHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [listFilterMenu, setListFilterMenu] = useState<IFilterCategoryList[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(10)
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
            fieldValue: 'active'
          },
          {
            name: 'Inativo',
            checked: false,
            fieldValue: 'desactive'
          }
        ]
      },
      {
        name: 'Cliente',
        fieldName: 'client',
        type: 'search',
        value: ''
      },
      {
        name: 'CPF/CNPJ',
        fieldName: 'cpf',
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

  // const getTransactions = useGetQuery('history-transactions')

  const createQueries = useCallback(() => {
    return listFilterMenu.reduce((acc, crr) => {
      if (crr.value) {
        if (crr.fieldName === 'date') {
          return {
            ...acc,
            queryParams: {
              fromDate: formatISO(crr.value[0]),
              toDate: formatISO(crr.value[1])
            }
          }
        }
        return {
          ...acc,
          fields: {
            ...acc,
            [crr.fieldName]: crr.value
          }
        }
      }

      return acc
    }, {})
  }, [listFilterMenu])

  const getData = useCallback(async () => {
    // const newArray = [...usersJson]
    const newArray = usersJson.map(e => {
      return {
        ...e,
        status: e.status === 'BASIC_APPROVED' ? 'Aprovado' : 'Criado'
      }
    })
    setUsersData([...newArray])
  }, [])

  // const getData = useCallback(async (
  //   selected = 0,
  //   queries = []
  // ) => {
  //   setIsLoading(true)
  //   setCurrentPage(selected)

  //   try {
  //     const limit = 10
  //     const historyData = await getTransactions.refetch({
  //       id: accountId,
  //       limit,
  //       starting_after: limit * selected,
  //       realLimit: 0,
  //       ...queries
  //     })

  //     console.log(historyData)

  //     const newArray = historyData.data.map(e => {
  //       const isNegative = !e.positive
  //       const value = `${!isNegative ? '+' : '-'}${formatMoney(Number(e.amount))}`
  //       const date = format(new Date(e.date), 'dd/MM/yyyy')

  //       return {
  //         ...e,
  //         date,
  //         value,
  //         isNegative
  //       }
  //     })

  //     setHistory(newArray)
  //     // setCurrentPage(historyData.pagination.)
  //     setPageCount(Math.ceil(historyData.pagination.itemCount / limit))
  //     // console.log(Math.ceil(historyData.pagination.itemCount / limit))

  //     setIsLoading(false)
  //     setIsError(false)
  //   } catch (error) {
  //     console.log(error)
  //     setIsError(true)
  //     setIsLoading(false)
  //   }
  // }, [listFilterMenu])

  const initialData = useCallback(async () => {
    if (usersData.length === 0) {
      try {
        await getData()
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
      // await getData(evt.selected, data)
      // setLimit(e => e + 10)
      // setIsLoading(false)
    } catch (error) {
      console.log(error)
      // setIsError(true)
      // setIsLoading(false)
    }
  // }, [getData])
  }, [])

  const filterAction = useCallback(async () => {
    try {
      const data = createQueries()
      // await getData(0, data)
      // setLimit(e => e + 10)
      // setIsLoading(false)
    } catch (error) {
      console.log(error)
      // setIsError(true)
      // setIsLoading(false)
    }
  // }, [getData])
  }, [])

  const goToTransactionDetails = useCallback(evt => {
    // setTransactionsData(e => ({
    //   ...e,
    //   filters: [],
    //   transactions: [],
    //   pageCount: 1,
    //   currentPage: 1
    // }))
    // if (evt.arr === 'ledger') {
    //   router.push(`${url.baseUrl}/history-transactions/${evt.arr}/${evt.index}/${evt.id}`)
    //   return
    // }
    // router.push(`${url.baseUrl}/history-transactions/${evt.arr}/${evt.method}/${evt.id}`)
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
                            {usersData.map((e, index) => (
                              <TrLink
                                key={index}
                                onClick={() => goToTransactionDetails(e)}
                              >
                                <td data-label='Status'>
                                  {e.status}
                                </td>
                                <td data-label='Cliente'>{e.name}</td>
                                <td data-label='CPF/CNPJ'>
                                  {cpfMask(e.document).formatedValue}
                                </td>
                                <td data-label='Saldo'>{e.amount}</td>
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

                    forcePage={currentPage}
                    pageCount={pageCount}
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
