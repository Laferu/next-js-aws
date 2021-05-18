import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Settings from '@/pages/settings/[slug]'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

// const mockGetData = jest.fn()
// const mockGetQueryData = jest.fn()

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: {
      slug: [
        'settings',
        'invite-team'
      ]
    },
    pathname: '/history-transactions/ledger/0/d101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd',
    push: jest.fn()
  })
}))

// jest.mock('@/hooks/useRest', () => {
//   return {
//     useGet: jest.fn((url) => {
//       if (url === 'all-boletos-cash-in') {
//         return {
//           refetch: mockGetData.mockImplementationOnce(() => [1, 2, 3])
//         }
//       }
//       if (url === 'all-boletos-cash-out') {
//         return {
//           refetch: mockGetData.mockImplementationOnce(() => [1, 2, 3, 4, 5])
//         }
//       }
//     }),
//     useGetQuery: () => ({
//       refetch: mockGetQueryData
//     })
//   }
// })

const customRender = (ui: JSX.Element, { providerProps, ...renderOptions }: { providerProps: { url: { baseUrl: string } } }) => {
  return render(
    <GlobalProvider>
      <GlobalStyles />
      {ui}
    </GlobalProvider>,
    renderOptions
  )
}

describe('Settings Page', () => {
  const profile = {
    data: {
      person: {
        name: 'Rafael'
      }
    }
  }

  it('', async () => {
    // mockGetQueryData.mockImplementation(() => (historyData))

    const { debug } = customRender(
      <Settings profile={profile} />,
      { providerProps }
    )

    // await waitFor(() => expect(mockGetData).toHaveBeenCalledTimes(2))
    // await waitFor(() => expect(mockGetQueryData).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      debug(undefined, 20000)
    })
  })
})
