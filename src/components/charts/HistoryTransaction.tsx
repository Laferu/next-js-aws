import { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'

import {
  ScrollableTableContainer,
} from '@/styles/GlobalStyles'
import {
  Container,
  Title,
  OptionsButton,
  StyledTableTransactions,
  TdValue,
  ViewerMore,
  TableTitleContainer,
  TableContainer,
  Icon
} from '@/styles/components/charts'
import formatMoney from '@/utils/formatMoney';
import { useGetQuery } from '@/hooks/useRest'
import ChartErrorBoundary from './ChartErrorBoundary';
import Loading from '../Loading';
import PaginatedScrollBar from '../PaginatedScrollBar';
import PerfectScrollbar from '../PerfectScrollbar';

interface IHistory {
  value: string
  date: string
  methodType: string
  isNegative: boolean
  status: string
  name: string
}

const HistoryTransaction = ({ accountId }) => {
  const [history, setHistory] = useState<IHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [listIsLoading, setListIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [limit, setLimit] = useState(10)
  const [isMoreHasClicked, setIsMoreHasClicked] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const getTransactions = useGetQuery('history-transactions')

  const getData = useCallback(async (
    oldData = [], countLimit = 10
  ) => {
    setListIsLoading(true)
    try {
      const historyData = await getTransactions.refetch({
        id: accountId,
        limit: countLimit,
        starting_after: 0
      })

      const newArray = historyData.data.map(e => {
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

      setHistory(newArray)

      if (oldData.length >= newArray.length) {
        setHasMore(false)
      }

      setListIsLoading(false)
    } catch (error) {
      console.log(error)
      setListIsLoading(false)
      setIsError(true)
      setIsLoading(false)
    }
  }, [])

  const initialData = useCallback(async () => {
    try {
      await getData([], 10)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }, [])

  const nextData = useCallback(async () => {
    try {
      await getData(history, limit)
      setLimit(e => e + 10)
      // setIsLoading(false)
    } catch (error) {
      console.log(error)
      // setIsError(true)
      // setIsLoading(false)
    }
  }, [history, limit])

  const handleClickMore = useCallback(async () => {
    setIsMoreHasClicked(true)
    await nextData()
  }, [])

  useEffect(() => {
    initialData()
  }, [initialData])

  const list = (
    <StyledTableTransactions>
      <thead>
        <tr>
          <th>Status</th>
          <th>Data</th>
          <th>Tipo de transação</th>
          <th>Valor</th>
          <th>Cliente</th>
        </tr>
      </thead>
      <tbody>
        {history.map((e: IHistory, index: number) => (
          <tr key={index}>
            <td data-label='Status'>
              <Icon status={e.status} />
            </td>
            <td data-label='Data'>{e.date}</td>
            <td data-label='Tipo de transação'>{e.methodType}</td>
            <TdValue  data-label='Valor' isNegative={e.isNegative}>
              {e.value}
            </TdValue>
            <td data-label='Tipo de transação'>{e.name}</td>
          </tr>
        ))}
      </tbody>
    </StyledTableTransactions>
  )

  return (
    <Container
      height='330px'
    >
      <ChartErrorBoundary>
        <Loading
          isLoading={isLoading}
          errorMessage='Não foi possível exibir os dados.'
          isError={isError}
        >
          <header>
            <TableTitleContainer>
              <Title>Histórico de Transação</Title>
              <OptionsButton />
            </TableTitleContainer>
          </header>
          {isMoreHasClicked ? (
            <PaginatedScrollBar
              dataLength={history.length}
              next={nextData}
              hasMore={hasMore}
              scrollableTarget='history-transaction-chart'
              isLoading={listIsLoading}
            >
              <TableContainer
                isScrollable={isMoreHasClicked}
              >
                <PerfectScrollbar id='history-transaction-chart'>
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column'
                  }}>{list}</div>

                </PerfectScrollbar>
              </TableContainer>

            </PaginatedScrollBar>
          ) : (
            <TableContainer
              isScrollable={isMoreHasClicked}
            >
              {list}
            </TableContainer>
          )}
          {!isMoreHasClicked && (
            <ViewerMore onClick={handleClickMore}>
              Mostrar mais
            </ViewerMore>
          )}
        </Loading>
      </ChartErrorBoundary>
    </Container>
  )
}

export default HistoryTransaction
