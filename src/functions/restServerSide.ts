import axios from 'axios'

// const v1 = '/v1/'
const v1 = ''

const UNAUTHORIZED = 401
const INTERNALSERVERERROR = 500

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`
})

export const getServerSide = async (resource: string) => {
  // const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  const carregar = async (errorMsg = null) => {
    // dispatch({ type: 'REQUEST' })
    try {
      const { data } = await api.get(v1 + resource)
      if (data.length > 0) {
        // dispatch({ type: 'SUCCESS', data: data })

        return {
          status: 'success',
          data
        }
      } else {
        // dispatch({ type: 'FAILURE', error: errorMsg })

        return {
          status: 'failure',
          data: []
        }
      }
    } catch (e) {
      // dispatch({
      //   type: 'FAILURE',
      //   error: 'Error do Servidor'
      // })

      return {
        status: 'failure',
        data: []
      }
    }
  }

  const result = await carregar()

  return result
}
