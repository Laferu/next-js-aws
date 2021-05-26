import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { CashInCashOutChart } from '@/components/charts'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

const mockGetData = jest.fn()

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

describe('Cash-In & Cash-Out chart component', () => {
  it('', async () => {
    const { debug } = customRender(
      <CashInCashOutChart />,
      { providerProps }
    )

    await waitFor(() => expect(mockGetData).toHaveBeenNthCalledWith(2))

    await waitFor(() => {
      debug()
    })
  })
})
