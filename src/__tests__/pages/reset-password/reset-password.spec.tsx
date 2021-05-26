import React from 'react'
import { render } from '@testing-library/react'
import ResetPassword from '@/pages/reset-password'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

const customRender = (ui: JSX.Element, { providerProps, ...renderOptions }: { providerProps: { url: { baseUrl: string } } }) => {
  return render(
    <GlobalProvider>
      <GlobalStyles />
      {ui}
    </GlobalProvider>,
    renderOptions
  )
}

describe('Reset Password Page', () => {

  it('', () => {
    const { debug } = customRender(<ResetPassword />, { providerProps })

    debug()
  })
})
