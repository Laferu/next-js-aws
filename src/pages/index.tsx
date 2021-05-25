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
  MainHome,
  Title
} from "@/styles/GlobalStyles"
import {
  Container,
  CardsContainer,
  ChartsContainer,
  StyledHeader,
  TitleContainer
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
          <MainHome>
            <StyledHeader>
              <TitleContainer>
                <Title>Dashboard</Title>
              </TitleContainer>
            </StyledHeader>
            <Container>
              <ChartsContainer firstRow='800px'>
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
          </MainHome>
        </PerfectScrollbar>
        <Sidebar />
      </Wrapper>
    </>
  )
}

export default Home

export const getServerSideProps = homeServerSideProps
