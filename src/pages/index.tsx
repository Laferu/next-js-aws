import { homeServerSideProps } from '@/serverSideFunctions/pages/home'
import {
  useEffect,
} from 'react'
// import { useTheme } from 'styled-components'
import PerfectScrollbar from '@/components/PerfectScrollbar'

import Header from "@/components/Header"
import SEO from "@/components/SEO"
import Sidebar from "@/components/Sidebar"
import {
  Wrapper,
  StyledMain
} from "@/styles/GlobalStyles"
import {
  Container,
  CardsContainer,
  ChartsContainer
} from '@/styles/pages/home'
import {
  TransactionsChart,
  CreateWalletsChart,
  Ticket,
  Volume,
  CashInCashOutChart,
  HistoryTransaction,
  TypeTransactions
} from '@/components/charts'

const Home = ({ profile, accountId }) => {
  // console.log(accountId)
  // const getHistoryTransaction = useGetQuery('history-transactions')

  // const initialValues = useCallback(async () => {
  //   const teste = await getHistoryTransaction.refetch({id: accountId})
  //   console.log('aaa', teste)
  // }, [])

  // useEffect(() => {
  //   initialValues()
  // }, [initialValues])

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <>
      <SEO
        title='Swipe - Dashboard'
        shouldExcludeTitleSuffix
        image='logo.png'
        shouldIndexPage={false}
      />
      <Header profile={profile.data} />
      <Wrapper>
        <PerfectScrollbar>
          <StyledMain>
            <Container>
              <ChartsContainer>
                <TransactionsChart />
                <CreateWalletsChart />
              </ChartsContainer>
              <CardsContainer>
                <Ticket />
                <Volume />
                <CashInCashOutChart />
              </CardsContainer>
              <ChartsContainer>
                <HistoryTransaction accountId={accountId} />
                <TypeTransactions />
              </ChartsContainer>
            </Container>
          </StyledMain>
        </PerfectScrollbar>
        <Sidebar />
      </Wrapper>
    </>
  )
}

export default Home

export const getServerSideProps = homeServerSideProps
