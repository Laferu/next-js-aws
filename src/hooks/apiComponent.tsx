import axios from 'axios'
import { useContext } from 'react'
import { GlobalContext } from '@/utils/Context'

const apiComponent = () => {
  const UNAUTHORIZED = 401
  const INTERNALSERVERERROR = 500
  const { url } = useContext(GlobalContext)

  const api = axios.create({
    baseURL: url.apiUrl
  })

  api.interceptors.response.use(
    response => response,
    error => {
      const { status } = error.response
      if (status === UNAUTHORIZED) {
        localStorage.removeItem('@Swipe:token')
        localStorage.removeItem('@Swipe:user')
        if (error.response.config.url.includes('login/autenticate') || error.response.config.url.includes('login/autenticateClient')) {
          error.message = 'loginSigninError'
          return Promise.reject(error)
        } else {
          return Promise.reject(error)
        }
      }
      if (status === INTERNALSERVERERROR) {
        error.message = 'Error do Servidor'
        return Promise.reject(error)
      }
    }
  )

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('@Swipe:token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  })

  return api
}

export default apiComponent
