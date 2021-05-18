import {
  useState,
  useCallback,
} from 'react'
import { sub } from 'date-fns'
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
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

const CreateWalletsChart = () => {
  const [tabSelected, setTabSelected] = useState<number>(0)
  const theme = useTheme()

  const yAxisStyles = {
    fontSize: 10,
    fontFamily: `'Roboto', sans-serif`,
    fontWeight: 500,
    fill: theme.palette.secondary.dark
  }

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
    }
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

  // const dateNow = new Date()
  // console.log(format(sub(dateNow, { months: 5 }), 'MMM'))

  const result = tabSelected === 0
    ? weekFormat(weeks) : tabSelected === 1
    ? monthFormat(months) : yearFormat(years)

  const CustomizedAxisTick = ({ x, y, payload: { value } }) => {
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
      <LineChart
        id='wallets'
        data={result}
        margin={{ top: 5, left: -35, right: 5, bottom: 5 }}
      >
        <CartesianGrid
          vertical={false}
        />
        <Line
          type="linear"
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
        <YAxis
          dataKey="value"
          axisLine={false}
          interval="preserveStartEnd"
          tickLine={false}
          tickCount={6}
          tick={yAxisStyles}
        />
      </LineChart>
    </ResponsiveContainer>
  )

  return (
    <Container height='330px'>
      <header>
        <TitleContainer>
          <Title>Criação de Carteiras</Title>
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

export default CreateWalletsChart
