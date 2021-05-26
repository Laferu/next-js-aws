import React from 'react'
import { render } from '@testing-library/react'
import { CreateWalletsChart } from '@/components/charts'
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

describe('SEO Component', () => {

  it('', () => {
    const { debug } = customRender(
      <CreateWalletsChart />,
      { providerProps }
    )

    debug()
  })
})
