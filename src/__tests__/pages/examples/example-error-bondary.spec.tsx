import React from 'react'
import { render } from '@testing-library/react'
import ExampleErrorBondary from '@/pages/examples/example-error-bondary'
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

describe('Examples Page', () => {

  it('', () => {
    const { debug } = customRender(<ExampleErrorBondary desactiveComponentError />, { providerProps })

    debug()
  })
})
