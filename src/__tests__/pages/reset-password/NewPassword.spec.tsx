import React from 'react'
import { render } from '@testing-library/react'
import NewPassword from '@/pages/reset-password/[...slug]'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
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

describe('New Password Page', () => {

  it('', () => {
    const { debug } = customRender(<NewPassword />, { providerProps })

    debug()
  })
})
