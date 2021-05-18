import React from 'react'
import { render } from '@testing-library/react'
import RootScreen from '@/components/RootScreen'
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

describe('RootScreen Component', () => {

  it('', () => {
    const { debug } = customRender(
      <RootScreen children={<>Aqui renderizaria as pages</>} />,
      { providerProps }
    )

    debug()
  })
})
