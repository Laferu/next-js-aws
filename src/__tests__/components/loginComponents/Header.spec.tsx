import React from 'react'
import { render } from '@testing-library/react'
import Header from '@/components/loginComponents/Header'
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

describe('Header Component', () => {

  it('', () => {
    const { debug } = customRender(
      <Header />,
      { providerProps }
    )

    debug()
  })
})
