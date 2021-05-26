import React from 'react'
import { render } from '@testing-library/react'
import ErrorBoundary from '@/components/ErrorBoundary'
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

const ComponentError = () => {
  spyOn(console, 'error')
  throw Error("error!");
  return <></>;
}

describe('ErrorBoundary Component', () => {

  it('', () => {
    const { debug } = customRender(
      <div>
        <ErrorBoundary>
          <ComponentError />
        </ErrorBoundary>
      </div>,
      { providerProps }
    )

    debug()
  })
})
