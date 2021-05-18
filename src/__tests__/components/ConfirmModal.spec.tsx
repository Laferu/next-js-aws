import React from 'react'
import { render } from '@testing-library/react'
import ConfirmModal from '@/components/ConfirmModal'
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

describe('ConfirmModal Component', () => {

  it('', () => {
    const { debug } = customRender(
      <ConfirmModal
        confirm={() => {}}
        message='Mensagem de teste'
      />,
      { providerProps }
    )

    debug()
  })
})
