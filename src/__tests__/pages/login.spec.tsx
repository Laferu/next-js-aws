import React from 'react'
import { render } from '@testing-library/react'
import Login from '@/pages/login'
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

describe('Examples Page', () => {

  it('', () => {
    const { debug } = customRender(<Login />, { providerProps })

    debug()
  })
})
