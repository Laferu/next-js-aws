import React from 'react'
import { render, waitFor } from '@testing-library/react'
import TransactionDetails from '@/pages/history-transactions/[...slug]'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
// import { ledgerData } from '@/__mocks__/transactionDetailsMocks'
import providerProps from '@/__mocks__/providerProps'

const mockGetQueryData = jest.fn()

jest.mock('@/hooks/useRest', () => {
  return {
    useGetQuery: () => ({
      refetch: mockGetQueryData
    })
  }
})

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: {
      slug: [
        'ledger',
        '0',
        'd101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd'
      ]
    },
    pathname: '/history-transactions/ledger/0/d101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd',
    push: jest.fn()
  })
}))

const customRender = (ui: JSX.Element, { providerProps, ...renderOptions }: { providerProps: { url: { baseUrl: string } } }) => {
  return render(
    <GlobalProvider>
      <GlobalStyles />
      {ui}
    </GlobalProvider>,
    renderOptions
  )
}

describe('Transaction Details Page', () => {
  // const mockRouter = {
  //   push: jest.fn()
  // }
  // ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

  const profile = {
    data: {
      person: {
        name: 'Rafael'
      }
    }
  }

  it('', async () => {
    const { debug } = customRender(
      <TransactionDetails profile={profile} />,
      { providerProps }
    )

    // mockGetPath.mockImplementationOnce(() => () => Promise.resolve(
    //   {
    //     slug: [
    //       'ledger',
    //       '0',
    //       'd101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd'
    //     ]
    //   }
    // ))
    // mockRouter.mockImplementation(() => ({ route: '/' }));

    await waitFor(() => {
      debug(undefined, 20000)
    })
  })
})
