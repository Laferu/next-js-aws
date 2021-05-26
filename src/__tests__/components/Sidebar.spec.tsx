import React from 'react'
import { useRouter } from 'next/router'
import { render } from '@testing-library/react'
import Sidebar from '@/components/Sidebar'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

// jest.mock('react', () => {
//   return {
//     useContext: jest.fn()
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

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    pathname: '/history-transactions/ledger/0/d101953cd984fb8ee5e925e6e19570a0d3a26f7fdafca5a67f8257346a4cf3cd',
    push: jest.fn()
  })
}))

describe('Sidebar Component', () => {
  it('', () => {
    const { debug } = customRender(
      <Sidebar />,
      { providerProps }
    )

    debug()
  })
})
