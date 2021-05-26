import React from 'react'
import { useRouter } from 'next/router'
// import { createRouter } from 'next/router';
// import { RouterContext } from 'next-server/dist/lib/router-context'
import { render } from '@testing-library/react'
import ProtectedClient from '@/pages/examples/protected-client-route-example'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

// jest.mock('react', () => {
//   return {
//     useContext: jest.fn()
//   }
// })

// const router = createRouter('', {}, '', {
//   initialProps: {},
//   pageLoader: jest.fn(),
//   App: jest.fn(),
//   Component: jest.fn(),
// });

const customRender = (ui: JSX.Element, { providerProps, ...renderOptions }: { providerProps: { url: { baseUrl: string } } }) => {
  return render(
    <GlobalProvider>
      <GlobalStyles />
      {/* <RouterContext.Provider value={router}> */}
        {ui}
      {/* </RouterContext.Provider> */}
    </GlobalProvider>,
    renderOptions
  )
}

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn()
}))

describe('Protect Client Route Example Page', () => {
  const mockRouter = {
    push: jest.fn(),
    pathname: jest.fn()
  }
  ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

  it('', () => {
    const { debug } = customRender(<ProtectedClient />, { providerProps })

    debug()
  })
})
