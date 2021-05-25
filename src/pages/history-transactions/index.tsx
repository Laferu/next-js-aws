import {
  useEffect,
  useCallback,
  useState,
  useContext
} from 'react'
import {
  historyTransactionsServerSideProps
} from '@/serverSideFunctions/pages/history-transactions'
import { format, formatISO } from 'date-fns'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

import {
  ITransactionData,
  ITransactionsData
} from '@/Interfaces/history-transaction'

import formatMoney from '@/utils/formatMoney';
import { useGetQuery } from '@/hooks/useRest'
import Header from "@/components/Header"
import SEO from "@/components/SEO"
import Sidebar from "@/components/Sidebar"
import DropdownFilter,
  {
    // IFilterCategoryList
  }
from '@/components/DropdownFilter'
import {
  Wrapper,
  StyledMain,
  Title,
  // ScrollableTableContainer,
  ResponsiveTable,
  TrLink,
  PaginateContainer,
  ShadowBox,
  TableContainer,
  Icon
} from "@/styles/GlobalStyles"
import {
  StyledHeader,
  TableWrapper,
  LegendContainer,
  Legend,
  TitleContainer,
  IconLegend
} from '@/styles/pages/history-transactions'
import TableErrorBoundary from '@/components/TableErrorBoundary'
import Loading from '@/components/Loading'
import { GlobalContext } from '@/utils/Context'
import PerfectScrollbar from '@/components/PerfectScrollbar'
import { cpfMask } from '@/utils/masks'
import { IFilterCategoryList } from '@/Interfaces/IDropdownList'

const HistoryTransactions = ({ profile, accountId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [listFilterMenu, setListFilterMenu] = useState<IFilterCategoryList[]>([])
  const {
    url,
    state: { setTransactionData, setTransactionsData, transactionsData }
  } = useContext(GlobalContext)
  const router = useRouter()

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
            fieldValue: 'PENDING,CREATED,AWAITING_CONFIRMATION,PROCESSING',
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
      // {
      //   name: 'Categoria',
      //   fieldName: 'category',
      //   type: 'select',
      //   value: null,
      //   list: [
      //     {
      //       name: 'Cash-In',
      //       fieldValue: 'CASH_IN',
      //       checked: false
      //     },
      //     {
      //       name: 'Cash-Out',
      //       fieldValue: 'CASH_OUT',
      //       checked: false
      //     },
      //     {
      //       name: 'Ledger',
      //       fieldValue: 'LEDGER',
      //       checked: false
      //     }
      //   ]
      // },
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
      }
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
    const filters: IFilterCategoryList[] = listFilterMenu || transactionsData.filters
    return filters.reduce((
      acc,
      crr
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
            .filter((elem, index, self) => index === self.indexOf(elem) && elem !== undefined)
            .toString()
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
    try {
      const limit = 10
      const historyData = await getTransactions.refetch({
        id: accountId,
        limit,
        starting_after: limit * selected,
        queryParams: queries
      })

      // console.log(historyData.data)

      if (historyData.data.length === 0) {
        if (transactionsData.transactions.length > 0) {
          setTransactionsData(e => ({
            ...e,
            pageCount: e.pageCount - 1
          }))
          setIsLoading(false)
          return
        }
        // setPageCount(e => e - 1)
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

      // console.log(historyData)

      const newArray = historyData.data.map((e: ITransactionData) => {
        const isNegative = !e.positive
        // const isNegative = false
        const value = `${!isNegative ? '+' : '-'}${formatMoney(Number(e.amount))}`
        // const value = formatMoney(Number(e.amount))
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
      // setCurrentPage(historyData.pagination.)
      // setPageCount(Math.ceil(historyData.pagination.itemCount / limit))
      // console.log(Math.ceil(historyData.pagination.itemCount / limit))

      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      console.log(error)
      // setHistory([])
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
      // console.log(evt.selected)
      const data = createQueries()
      // console.log(data)
      await getData(evt.selected, data)
      // setLimit(e => e + 10)
      // setIsLoading(false)
    } catch (error) {
      console.log(error)
      // setIsError(true)
      // setIsLoading(false)
    }
  }, [getData, createQueries])

  const filterAction = useCallback(async () => {
    try {
      const data = createQueries()
      // console.log('queries', data)
      await getData(0, data)
      // setLimit(e => e + 10)
      // setIsLoading(false)
    } catch (error) {
      console.log('erro', error)
      // setIsError(true)
      // setIsLoading(false)
    }
  }, [getData, createQueries])

  const goToTransactionDetails = useCallback((evt: ITransactionData) => {
    const index = 0
    setTransactionData(evt)
    if (evt.arr === 'ledger') {
      router.push(`${url.baseUrl}/history-transactions/${evt.arr}/${index}/${evt.id}`)
      return
    }
    router.push(`${url.baseUrl}/history-transactions/${evt.arr}/${evt.method}/${evt.id}`)
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
                <Title>Histórico de transações</Title>
              </TitleContainer>
              <DropdownFilter
                state={{
                  list: listFilterMenu || transactionsData.filters,
                  setList: setListFilterMenu
                }}
                action={filterAction}
                width='1000px'
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
                              <th>Id da transação</th>
                              <th>Tipo de Transação</th>
                              <th>Valor</th>
                              <th>Cliente</th>
                              <th>CPF/CNPJ</th>
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
                                <td data-label='Id da transação'>
                                  {e.id}
                                </td>
                                <td data-label='Tipo de transação'>{e.methodType}</td>
                                <td data-label='Valor'>{e.value}</td>
                                <td data-label='Cliente'>{e.name}</td>
                                <td data-label='CPF'>{cpfMask(e.document).formatedValue}</td>
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
                    // initialPage={currentPage - 1}
                    pageCount={transactionsData.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={nextData}
                  />
                </PaginateContainer>
              </TableContainer>
            </ShadowBox>
            <LegendContainer>
              <Legend>
                <IconLegend status='SUCCESS' />
                <p>Transação Realizada</p>
              </Legend>
              <Legend>
                <IconLegend status='WARNING' />
                <p>Transação Pendente</p>
              </Legend>
              <Legend>
                <IconLegend status='ERROR' />
                <p>Transação Recusada</p>
              </Legend>
            </LegendContainer>
          </StyledMain>
        </PerfectScrollbar>
        <Sidebar />
      </Wrapper>
    </>
  )
}

export default HistoryTransactions

export const getServerSideProps = historyTransactionsServerSideProps
