import React from 'react'
import { render, waitFor } from '@testing-library/react'
import UserTransactions from '@/pages/users/[...slug]'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import { historyData } from '@/__mocks__/historyTransactionMocks'
import providerProps from '@/__mocks__/providerProps'

const mockGetQueryData = jest.fn()

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: {
      slug: [
        'd101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd',
      ]
    },
    pathname: '/users/d101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd',
    push: jest.fn()
  })
}))

jest.mock('@/hooks/useRest', () => {
  return {
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

describe('History Transactions Page', () => {
  const profile = {
    data: {
      person: {
        name: 'Rafael'
      }
    }
  }

  const user = {
    person: {
      name: 'Rafael Peneira de Caramujo',
      cpf: '332900244509',
    },
    createdAt: '2021-02-25T15:12:32-03:00',
  }

  it('', async () => {
    mockGetQueryData.mockImplementation(() => (historyData))

    const { debug } = customRender(
      <UserTransactions profile={profile} user={user} />,
      { providerProps }
    )

    await waitFor(() => expect(mockGetQueryData).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      debug(undefined, 20000)
    })
  })
})
