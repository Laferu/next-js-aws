import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { HistoryTransaction } from '@/components/charts'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import { historyData } from '@/__mocks__/historyTransactionMocks'
import providerProps from '@/__mocks__/providerProps'

const mockHistoryData = jest.fn()

jest.mock('@/hooks/useRest', () => {
  return {
    useGetQuery: () => ({
      refetch: mockHistoryData
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

describe('HistoryTransaction Component', () => {
  it('', async () => {
    mockHistoryData.mockImplementation(() => (historyData))

    const { debug } = customRender(
      <HistoryTransaction accountId='123' />,
      { providerProps }
    )

    await waitFor(() => expect(mockHistoryData).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      debug()
    })
  })
})
