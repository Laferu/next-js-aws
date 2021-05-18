import {
  useState,
  useCallback
} from 'react'
import { sub } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer
} from 'recharts'
import { useTheme } from 'styled-components'

import {
  Container,
  TitleContainer,
  Title,
  OptionsButton,
  TabsContainer,
  Tab
} from '@/styles/components/charts'
import weekFormat from './functions/weekFormat'
import monthFormat from './functions/monthFormat'
import yearFormat from './functions/yearFormat'

const TransactionsChart = () => {
  const [tabSelected, setTabSelected] = useState<number>(1)
  const theme = useTheme()

  const handleTab = useCallback(e => {
    setTabSelected(e)
  }, [])

  const tabs = [
    {
      index: 0,
      title: 'Semanal'
    },
    {
      index: 1,
      title: 'Mensal'
    },
    {
      index: 2,
      title: 'Anual'
    },
  ]

  const dateNow = new Date()

  const weeks = [
    { value: 10, date: sub(dateNow, { weeks: 3, days: 0 }) },
    { value: 25, date: sub(dateNow, { weeks: 2, days: 4 }) },
    { value: 20, date: sub(dateNow, { weeks: 2, days: 0 }) },
    { value: 35, date: sub(dateNow, { weeks: 1, days: 4 }) },
    { value: 35, date: sub(dateNow, { weeks: 1, days: 0 }) },
    { value: 55, date: sub(dateNow, { weeks: 0, days: 4 }) },
    { value: 58, date: sub(dateNow, { weeks: 0, days: 0 }) },
  ]

  const months = [
    { value: 10, date: sub(dateNow, { months: 11 }) },
    { value: 25, date: sub(dateNow, { months: 10 }) },
    { value: 20, date: sub(dateNow, { months: 9 }) },
    { value: 35, date: sub(dateNow, { months: 8 }) },
    { value: 35, date: sub(dateNow, { months: 7 }) },
    { value: 55, date: sub(dateNow, { months: 6 }) },
    { value: 58, date: sub(dateNow, { months: 5 }) },
    { value: 48, date: sub(dateNow, { months: 4 }) },
    { value: 46, date: sub(dateNow, { months: 3 }) },
    { value: 52, date: sub(dateNow, { months: 2 }) },
    { value: 45, date: sub(dateNow, { months: 1 }) },
    { value: 38, date: sub(dateNow, { months: 0 }) },
  ]

  const years = [
    { value: 20, date: sub(dateNow, { years: 9 }) },
    { value: 35, date: sub(dateNow, { years: 8 }) },
    { value: 35, date: sub(dateNow, { years: 7 }) },
    { value: 55, date: sub(dateNow, { years: 6 }) },
    { value: 58, date: sub(dateNow, { years: 5 }) },
    { value: 48, date: sub(dateNow, { years: 4 }) },
    { value: 46, date: sub(dateNow, { years: 3 }) },
    { value: 52, date: sub(dateNow, { years: 2 }) },
    { value: 45, date: sub(dateNow, { years: 1 }) },
    { value: 38, date: sub(dateNow, { years: 0 }) },
  ]

  const transactions = tabSelected === 0
    ? weekFormat(weeks) : tabSelected === 1
    ? monthFormat(months) : yearFormat(years)

  // const transactions = [
  //   { label: 'Jan', value: 200 },
  //   { label: 'Fev', value: 400 },
  //   { label: 'Mar', value: 300 },
  //   { label: 'Abr', value: 500 },
  //   { label: 'Mai', value: 200 },
  //   { label: 'Jun', value: 100 },
  //   { label: 'Jul', value: 500 },
  //   { label: 'Ago', value: 500 },
  //   { label: 'Set', value: 500 },
  //   { label: 'Out', value: 500 },
  //   { label: 'Nov', value: 500 },
  //   { label: 'Dez', value: 500 }
  // ]

  const CustomizedAxisTick = ({ x, y, index, payload: { value } }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={8}
          y={0}
          dy={14}
          textAnchor="end"
          fill={theme.palette.secondary.dark}
          className='axis-svg-text'
        >
          {value}
        </text>
      </g>
    );
  }

  const renderChart = (
    <ResponsiveContainer width='100%' height={200}>
      <LineChart id='transactions' data={transactions}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
        />
        <XAxis
          dataKey="label"
          interval="preserveStartEnd"
          axisLine={false}
          tickLine={false}
          tick={CustomizedAxisTick}
        />
      </LineChart>
    </ResponsiveContainer>
  )

  return (
    <Container height='330px'>
      <header>
        <TitleContainer>
          <Title>Transações por Período</Title>
          <OptionsButton />
        </TitleContainer>
        <TabsContainer>
          {tabs.map(e => (
            <Tab
              key={e.index}
              onClick={() => handleTab(e.index)}
              active={e.index === tabSelected}
            >
              <div>
                {e.title}
              </div>
            </Tab>
          ))}
        </TabsContainer>
      </header>
        {renderChart}
    </Container>
  )
}

export default TransactionsChart
