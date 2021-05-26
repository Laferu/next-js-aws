import React from 'react'
import { render } from '@testing-library/react'
import BreadCrumb from '@/components/BreadCrumb'
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

describe('Dropdown Filter Component', () => {
  const pages = [
    {
      name: 'Page 1',
      url: 'http://localhost/page1'
    },
    {
      name: 'Subpage',
      url: 'http://localhost/page1/subpage'
    }
  ]

  it('', () => {
    const { debug } = customRender(
      <BreadCrumb
        pages={pages}
      />,
      { providerProps }
    )
    debug()
  })
})
