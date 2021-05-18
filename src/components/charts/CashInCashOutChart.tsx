import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import {
  Container,
  TitleContainer,
  Title,
  OptionsButton,
  FakeChartBar,
  CustomLabelBarContainer,
  CustomBarContainer,
  CustomLabel,
  CustomBar
} from '@/styles/components/charts'
import { useGet } from '@/hooks/useRest'
import Loading from '../Loading'
import ChartErrorBoundary from './ChartErrorBoundary'

interface ICashValues {
  value: number
  percentege: number
  proporcionalValue: number
}

// interface ICashStates {
//   state: ICashValues
//   setState: React.Dispatch<React.SetStateAction<ICashValues>>
// }

const CashInCashOutChart = () => {
  const getBoletoCashIn = useGet('all-boletos-cash-in')
  const getBoletoCashOut = useGet('all-boletos-cash-out')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [cashIn, setCashIn] = useState<ICashValues>({
    value: 0,
    percentege: 0,
    proporcionalValue: 0
  })
  const [cashOut, setCashOut] = useState<ICashValues>({
    value: 0,
    percentege: 0,
    proporcionalValue: 0
  })

  const theme = useTheme()

  const calcPercentege = useCallback(async () => {
    try {
      const getCashOut = await getBoletoCashOut.refetch()
      const getCashIn = await getBoletoCashIn.refetch()

      const total = 10 + 1
      const cashInValue = getCashIn?.length || 1
      const cashOutValue = getCashOut?.length || 1
      const cashOutPercentege = cashOutValue / total * 100
      const cashInPercentege = cashInValue / total * 100
      setIsLoading(false)

      if (cashInValue < cashOutValue) {
        const proporcionalValue = 100 / cashOutValue * cashInValue

        setCashIn(e => ({ ...e, proporcionalValue, percentege: cashInPercentege }))
        setCashOut(e => ({ ...e, proporcionalValue: 100, percentege: cashOutPercentege }))
      } else if (cashInValue > cashOutValue) {
        const proporcionalValue = 100 / cashInValue * cashOutValue

        setCashOut(e => ({ ...e, proporcionalValue, percentege: cashOutPercentege }))
        setCashIn(e => ({ ...e, proporcionalValue: 100, percentege: cashInPercentege }))
      }
      else if (cashInValue !== 0 && cashOutValue !== 0) {
        setCashOut(e => ({ ...e, proporcionalValue: 100, percentege: 50 }))
        setCashIn(e => ({ ...e, proporcionalValue: 100, percentege: 50 }))
      }
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }

  }, [])

  useEffect(() => {
    calcPercentege()

    return () => {}
  }, [calcPercentege])

  return (
    <Container height='190px'>
      <ChartErrorBoundary>
        <Loading
          isLoading={isLoading}
          errorMessage='Não foi possível exibir os dados.'
          isError={isError}
        >
          <header>
            <TitleContainer>
              <Title>Porcentagem de Cash-In e Cash-Out</Title>
              <OptionsButton />
            </TitleContainer>
          </header>
          <FakeChartBar>
            <CustomLabelBarContainer>
              <CustomLabel>
                  Cash-In
                </CustomLabel>
              <CustomBarContainer>
                <CustomBar
                  width={`${cashIn.proporcionalValue}%`}
                  color={theme.palette.green.main}
                >
                  <p>{cashIn.percentege.toFixed(2)}%</p>
                </CustomBar>
              </CustomBarContainer>
            </CustomLabelBarContainer>
            <CustomLabelBarContainer>
              <CustomLabel>
                  Cash-Out
                </CustomLabel>
              <CustomBarContainer>
                <CustomBar
                  width={`${cashOut.proporcionalValue}%`}
                  color={theme.palette.primary.main}
                >
                  <p>{cashOut.percentege.toFixed(2)}%</p>
                </CustomBar>
              </CustomBarContainer>
            </CustomLabelBarContainer>
          </FakeChartBar>
        </Loading>
      </ChartErrorBoundary>
    </Container>
  )
}

export default CashInCashOutChart
