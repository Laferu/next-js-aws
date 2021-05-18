import {
  useEffect,
  useCallback,
  useState,
  useContext
} from 'react'
import {
  userTransactionsServerSideProps
} from '@/serverSideFunctions/pages/users'
import { format, formatISO } from 'date-fns'
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
  ShadowBox,
  // ScrollableTableContainer,
  ResponsiveTable,
  PaginateContainer,
  TableContainer,
  Icon,
  TrLink,
} from "@/styles/GlobalStyles"
import {
  StyledHeader,
  UserHeaderContainer,
  UserDataContainer,
  TableWrapper
} from '@/styles/pages/users'
import TableErrorBoundary from '@/components/TableErrorBoundary'
import Loading from '@/components/Loading'
import { GlobalContext } from '@/utils/Context'
import BreadCrumb from '@/components/BreadCrumb'
import { cpfMask } from '@/utils/masks'
import { ParsedUrlQuery } from 'querystring'
import PerfectScrollbar from '@/components/PerfectScrollbar'
import { IFilterCategoryList } from '@/Interfaces/IDropdownList'
import { ITransactionData, ITransactionsData } from '@/Interfaces/history-transaction'

const UserTransactions = ({ profile, user }) => {
  const {
    url,
    state: {
      setSelectedMenu,
      setTransactionData,
      setTransactionsData,
      transactionsData
    }
  } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [listFilterMenu, setListFilterMenu] = useState<IFilterCategoryList[]>([])
  // const [history, setHistory] = useState([])
  // const [currentPage, setCurrentPage] = useState(0)
  // const [pageCount, setPageCount] = useState(10)
  const router = useRouter()

  const { slug }: ParsedUrlQuery = router.query
  const name = user.person.name.split(' ')[0]

  const filterMenuInitialValues = useCallback(() => {
    const filters: IFilterCategoryList[] = [
      {
        name: 'Status',
        fieldName: 'status',
        type: 'select',
        value: null,
        list: [
          {
            name: 'Aprovado',
            fieldValue: 'SUCCESS,PAID',
            checked: false
          },
          {
            name: 'Pendente',
            fieldValue: 'PENDING,CREATED,AWAITING_CONFIRMATION,PROCESSING,WARNING',
            checked: false
          },
          {
            name: 'Recusado',
            fieldValue: 'FAILED,ERROR,CANCELLED',
            checked: false
          },
        ]
      },
      {
        name: 'Data',
        fieldName: 'date',
        type: 'date',
        value: null,
        date: [
          new Date(),
          new Date()
        ]
      },
      {
        name: 'Tipo de transação',
        fieldName: 'type',
        type: 'select',
        value: null,
        list: [
          {
            name: 'Pagamento - Boleto',
            categoryValue: 'CASH_OUT',
            fieldValue: 'BANK_SLIP',
            checked: false
          },
          {
            name: 'Depósito - Boleto',
            categoryValue: 'CASH_IN',
            fieldValue: 'BANK_SLIP',
            checked: false
          },
          {
            name: 'Cartão de crédito',
            // categoryValue: 'CASH_IN',
            fieldValue: 'CREDIT_CARD',
            checked: false
          },
          // {
          //   name: 'Recargas',
          //   fieldValue: 'TOP_UP',
          //   checked: false
          // },
          // {
          //   name: 'Loterica',
          //   fieldValue: 'LOTTERY',
          //   checked: false
          // },
          {
            name: 'TED',
            // categoryValue: 'CASH_OUT',
            fieldValue: 'BANK_TED',
            checked: false
          },
          {
            name: 'Transferência P2P',
            // categoryValue: 'LEDGER',
            fieldValue: 'TRANSFER',
            checked: false
          }
          // {
          //   name: 'Depósito',
          //   fieldValue: 'ISSUE_ASSET',
          //   checked: false
          // },
          // {
          //   name: 'Saque',
          //   fieldValue: 'BURN_ASSET',
          //   checked: false
          // },
        ]
      },
      {
        name: 'Valor',
        fieldName: 'amount',
        type: 'search',
        format: 'money',
        value: [null, null]
      },
      // {
      //   name: 'Categoria',
      // },
    ]

    if (transactionsData.filters.length === 0) {
      setTransactionsData(e => ({
        ...e,
        filters: [...filters]
      }))
      setListFilterMenu([...filters])
    } else {
      setListFilterMenu([...transactionsData.filters])
    }
  }, [])

  const getTransactions = useGetQuery('history-transactions')

  const createQueries = useCallback(() => {
    const filters = listFilterMenu
    return filters.reduce((
      acc,
      crr: IFilterCategoryList
    ) => {
      if (crr.value) {
        if (crr.fieldName === 'date') {
          return {
            ...acc,
              fromDate: formatISO(crr.value[0]),
              toDate: formatISO(crr.value[1])
          }
        }
        if (crr.fieldName === 'amount') {
          if (crr.value[0] !== null && crr.value[1] !== null) {
            return {
              ...acc,
                amountFrom: crr.value[0],
                amountTo: crr.value[1]
              }
          } else {
            return acc
          }
        }
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
      // if (crr.fieldName === 'category') {
      //   const category = crr.list.filter(e => e.checked === true)
      //   if (category.length === crr.list.length) {
      //     return acc
      //   }
      //   if (category.length > 0) {
      //     return {
      //       ...acc,
      //         service: category.map(e => e.fieldValue).toString()
      //     }
      //   }
      // }
      if (crr.fieldName === 'type') {
        const serviceType = crr.list.filter(e => e.checked === true)
        if (serviceType.length === crr.list.length) {
          return acc
        }
        if (serviceType.length > 0) {
          const serviceTypeUnique = serviceType
            .map(e => e.fieldValue)
            .filter((elem, index, self) => index === self.indexOf(elem))
            .toString()
          if (
            serviceType
              .filter(
                e => e.name === 'Pagamento - Boleto' ||
                  e.name === 'Depósito - Boleto'
              ).length > 0
          ) {
            const serviceUnique = serviceType
            .map(e => e.categoryValue)
            .filter((elem, index, self) => index === self.indexOf(elem))
            .toString().replace(',', '')
            return {
              ...acc,
                service: serviceUnique,
                serviceType: serviceTypeUnique
            }
          } else {
            return {
              ...acc,
              serviceType: serviceTypeUnique
            }
          }

        }
      }

      return acc
    }, {})
  }, [listFilterMenu, transactionsData.filters])

  const getData = useCallback(async (
    selected: number = 0,
    queries: Object = {}
  ) => {
    setIsLoading(true)
    // setCurrentPage(selected)

    try {
      const limit = 10
      const historyData = await getTransactions.refetch({
        id: slug[0],
        limit,
        starting_after: limit * selected,
        queryParams: queries
      })

      // console.log(historyData)

      if (historyData.data.length === 0) {
        if (transactionsData.transactions.length > 0) {
          setTransactionsData(e => ({
            ...e,
            pageCount: e.pageCount - 1
          }))
          setIsLoading(false)
          return
        }
        setIsLoading(false)
      } else {
        setTransactionsData(e => ({
          ...e,
          currentPage: selected
        }))

        if (
          selected + 1 >= transactionsData.pageCount &&
          historyData.data.length === limit
        ) {
          // setPageCount(e => e + 1)
          setTransactionsData(e => ({
            ...e,
            pageCount: e.pageCount + 1
          }))
        }
      }

      const newArray = historyData.data.map((e: ITransactionData) => {
        const isNegative = !e.positive
        const value = `${!isNegative ? '+' : '-'}${formatMoney(Number(e.amount))}`
        const date = format(new Date(e.createdAt), 'dd/MM/yyyy')

        return {
          ...e,
          date,
          value,
          isNegative
        }
      })

      // setHistory(newArray)
      setTransactionsData(e => ({
        ...e,
        transactions: newArray
      }))
      // setPageCount(Math.ceil(historyData.pagination.itemCount / limit))

      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.log(error)
      setTransactionsData(e => ({
        ...e,
        transactions: []
      }))
      setIsError(true)
      setIsLoading(false)
    }
  }, [transactionsData.filters, listFilterMenu, transactionsData.pageCount, transactionsData.transactions])

  const initialData = useCallback(async () => {
    if (transactionsData.transactions.length === 0) {
      try {
        await getData(0)
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
      await getData(evt.selected, data)
    } catch (error) {
      console.log(error)
    }
  }, [getData, createQueries])

  const filterAction = useCallback(async () => {
    try {
      const data = createQueries()
      await getData(0, data)
    } catch (error) {
      console.log(error)
    }
  }, [getData, createQueries])

  const goToTransactionDetails = useCallback(evt => {
    setTransactionData(evt)
    setSelectedMenu('/users')
    if (evt.arr === 'ledger') {
      router.push(`${url.baseUrl}/history-transactions/${evt.arr}/${evt.index}/${evt.id}/${name}/${slug[0]}`)
      return
    }
    router.push(`${url.baseUrl}/history-transactions/${evt.arr}/${evt.method}/${evt.id}/${name}/${slug[0]}`)
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
            <BreadCrumb
              pages={[
                {
                  name: 'Usuários',
                  url: `${url.baseUrl}/users`
                },
                {
                  name: name,
                  url: `${url.baseUrl}/users/${Array.isArray(slug) && slug.join('/')}`
                }
              ]}
            />
            <StyledHeader>
              <UserHeaderContainer>
                <ShadowBox>
                  <UserDataContainer>
                    <span />
                    <h1>{user.person.name}</h1>
                    <div className='icon-container' />
                    <div className='data-container'>
                      <p className='cpf'>CPF: {cpfMask(user.person.cpf).formatedValue}</p>
                      <p className='date'>Cliente ativo desde: {format(new Date(user.createdAt), 'dd/MM/yyyy')}</p>
                      <p className='amount'>Saldo disponível: <span>R$2.582,15</span></p>
                    </div>
                  </UserDataContainer>
                </ShadowBox>
              </UserHeaderContainer>
              <DropdownFilter
                state={{
                  list: listFilterMenu || transactionsData.filters,
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
                      <PerfectScrollbar>
                        <ResponsiveTable>
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Data</th>
                              <th>Tipo de Transação</th>
                              <th>Valor</th>
                              <th>Categoria</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionsData.transactions.map((e, index) => (
                              <TrLink
                                key={index}
                                onClick={() => goToTransactionDetails(e)}
                              >
                                <td data-label='Status'>
                                  <Icon status={e.status} />
                                </td>
                                <td data-label='Data'>{e.date}</td>
                                <td data-label='Tipo de transação'>{e.methodType}</td>
                                <td data-label='Valor'>{e.value}</td>
                                <td data-label='Categoria'>
                                  {e.arr}
                                </td>
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

                    forcePage={transactionsData.currentPage}
                    pageCount={transactionsData.pageCount}
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

export default UserTransactions

export const getServerSideProps = userTransactionsServerSideProps
