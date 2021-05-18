import React from 'react'
import { render } from '@testing-library/react'
import InputLabel from '@/components/loginComponents/InputLabel'
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

describe('InputLabel Component', () => {

  it('InputLabel Component - Test type text', () => {
    const { debug } = customRender(
      <InputLabel
        label='Nome'
        type='text'
      />,
      { providerProps }
    )

    debug()
  })

  it('InputLabel Component - Test type password', () => {
    const { debug } = customRender(
      <InputLabel
        label='Password'
        type='password'
      />,
      { providerProps }
    )

    debug()
  })
})
