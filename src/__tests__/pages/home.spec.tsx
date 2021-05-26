import React from 'react'
import { useRouter } from 'next/router'
import { render, waitFor } from '@testing-library/react'
import Home from '@/pages'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import { historyData } from '@/__mocks__/historyTransactionMocks'
import providerProps from '@/__mocks__/providerProps'

const mockGetData = jest.fn()
const mockGetQueryData = jest.fn()

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    pathname: '/history-transactions/ledger/0/d101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd',
    push: jest.fn()
  })
}))

jest.mock('@/hooks/useRest', () => {
  return {
    useGet: jest.fn((url) => {
      if (url === 'all-boletos-cash-in') {
        return {
          refetch: mockGetData.mockImplementationOnce(() => [1, 2, 3])
        }
      }
      if (url === 'all-boletos-cash-out') {
        return {
          refetch: mockGetData.mockImplementationOnce(() => [1, 2, 3, 4, 5])
        }
      }
    }),
    useGetQuery: () => ({
      refetch: mockGetQueryData
    })
  }
})

const customRender = (ui: JSX.Element, { providerProps, ...renderOptions }: { providerProps: { url: { baseUrl: string } } }) => {
  return render(
    <GlobalProvider>
      <GlobalStyles />
      {ui}
    </GlobalProvider>,
    renderOptions
  )
}

describe('Home Page', () => {
  const profile = {
    data: {
      person: {
        name: 'Rafael'
      }
    }
  }

  it('', async () => {
    mockGetQueryData.mockImplementation(() => (historyData))

    const { debug } = customRender(
      <Home profile={profile} accountId='123' />,
      { providerProps }
    )

    await waitFor(() => expect(mockGetData).toHaveBeenCalledTimes(2))
    await waitFor(() => expect(mockGetQueryData).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      debug(undefined, 20000)
    })
  })
})
