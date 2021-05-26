import React from 'react'
import { render } from '@testing-library/react'
import Examples from '@/pages/examples'
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
  const dataArray = [
    {
      id: 1,
      title: 'Teste'
    },
    {
      id: 2,
      title: 'Teste2'
    }
  ]

  it('', () => {
    const { debug } = customRender(<Examples dataArray={dataArray} />, { providerProps })

    debug()
  })
})
