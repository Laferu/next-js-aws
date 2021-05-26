import { useContext } from 'react'
import axios from 'axios'
import { render, waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { useGet, useGetQuery, usePost, usePostForm } from '@/hooks/useRest'
import apiComponent from '@/hooks/apiComponent'
import { GlobalContext, GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'

// const api = apiComponent()

// const mockGetData = jest.fn()

// jest.mock('@/hooks/useRest', () => {
//   return {
//     useGet: jest.fn(() => {
//       return {
//         refetch: mockGetData.mockImplementationOnce(() => [1, 2, 3])
//       }
//     })
//   }
// })

const wrapper = ({ children }) => (
  <GlobalProvider>
    <GlobalStyles />
    {children}
  </GlobalProvider>
)

const baseURL = process.env.REACT_APP_HOST + '/api/'

describe('Rest API Hook', () => {
  it('Verificar o Get', async () => {
    const apiMock = new MockAdapter(axios)

    apiMock.onGet(baseURL + 'all-boletos-cash-in').reply(200, {
      data: [1, 2, 3]
    })
    let teste: { data: number[] }

    const { result, waitForNextUpdate } = renderHook(() => useGet('all-boletos-cash-in'), {
      wrapper
    })

    act(() => {
      teste = result.current.refetch()
    })
    waitForNextUpdate()

    expect((await teste).data[0]).toBe(1)
  })

  it('Verificar o Get Query', async () => {
    const apiMock = new MockAdapter(axios)

    apiMock.onGet(baseURL + 'all-boletos-cash-in').reply(200, {
      data: [1, 2, 3]
    })
    let teste: { data: number[] }

    const { result, waitForNextUpdate } = renderHook(() => useGetQuery('all-boletos-cash-in'), {
      wrapper
    })

    act(() => {
      teste = result.current.refetch({
        id: 123,
        limit: 3,
        starting_after: 0
      })
    })
    waitForNextUpdate()

    expect((await teste).data[0]).toBe(1)
  })

  it('Verificar o Post', async () => {
    const apiMock = new MockAdapter(axios)

    apiMock.onPost(baseURL + 'login').reply(200, {
      data: {
        isLogged: true,
        login: 'filhojoseildo@gmail.com',
        accountId: '413681',
        sessionId: '235158132'
      },
      status: 200
    })
    let teste: any

    const { result, waitForNextUpdate } = renderHook(() => usePost('login'), {
      wrapper
    })

    act(() => {
      teste = result.current.post({
        login: 'filhojoseildo@gmail.com',
        password: '123',
        expirationInDays: 1
      })
    })
    waitForNextUpdate()

    expect((await teste).data.login).toBe('filhojoseildo@gmail.com')
  })

  it('Verificar o Post Form', async () => {
    const apiMock = new MockAdapter(axios)

    apiMock.onPost(baseURL + 'login').reply(200, {
      data: {
        isLogged: true,
        login: 'filhojoseildo@gmail.com',
        accountId: '413681',
        sessionId: '235158132'
      },
      status: 200
    })
    let teste: any

    const { result, waitForNextUpdate } = renderHook(() => usePostForm('login'), {
      wrapper
    })

    act(() => {
      teste = result.current.post({
        login: 'filhojoseildo@gmail.com',
        password: '123',
        expirationInDays: 1
      })
    })
    waitForNextUpdate()

    expect((await teste).data.login).toBe('filhojoseildo@gmail.com')
  })
})
