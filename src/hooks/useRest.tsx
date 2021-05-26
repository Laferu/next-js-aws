import { useReducer, useCallback } from 'react'
import apiComponent from '@/hooks/apiComponent'

const v1 = ''

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: ''
}

const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  if (action.type === 'FAILURE') {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }
  return state
}

export const useGet = (resource: string) => {
  const api = apiComponent()

  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  const carregar = useCallback(async (dados: Object = null, errorMsg = null) => {
    dispatch({ type: 'REQUEST' })
    try {
      const { data } = await api.get(v1 + resource, dados)
      if (Object.keys(data).length > 0) {
        dispatch({ type: 'SUCCESS', data: data })

        return data
      } else {
        dispatch({ type: 'FAILURE', error: errorMsg })
        console.log(data)

        return []
      }
    } catch (e) {
      dispatch({
        type: 'FAILURE',
        error: 'Error do Servidor'
      })

      return []
    }
  }, [])
  return {
    ...data,
    refetch: carregar,
  }
}

export const useGetQuery = (resource: string) => {
  const api = apiComponent()

  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  const carregar = useCallback(async (query: object = null, errorMsg = null) => {
    dispatch({ type: 'REQUEST' })
    try {
      const { data } = await api.get(v1 + resource, {
        params: query
      })
      if (Object.keys(data).length > 0) {
        dispatch({ type: 'SUCCESS', data: data })

        return data
      } else {
        dispatch({ type: 'FAILURE', error: errorMsg })

        return []
      }
    } catch (e) {
      dispatch({
        type: 'FAILURE',
        error: 'Error do Servidor'
      })

      return []
    }
  }, [])
  return {
    ...data,
    refetch: carregar
  }
}

export const usePost = (resource: string, errorMsg: string = 'erro') => {
  const api = apiComponent()

  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  const post = useCallback(async (dados: Object) => {
    dispatch({ type: 'REQUEST' })
    try {
      const { data } = await api.post(v1 + resource, dados)
      dispatch({ type: 'SUCCESS', data: data })
      if (Object.keys(data).length > 0) {
        dispatch({ type: 'SUCCESS', data: data })
      } else {
        dispatch({ type: 'FAILURE', error: errorMsg })
        // swal({ icon: 'error', text: errorMsg })
        console.log(errorMsg)
      }

      return data
    } catch (e) {
      if (e.message === 'loginSigninError') {
        // swal({ icon: 'error', text: errorMsg })
        console.log(errorMsg)
      }
      dispatch({
        type: 'FAILURE',
        error: 'Error do Servidor'
      })

      return e
    }
  }, [])

  return { data, post }
}

export const usePostForm = (resource: string, errorMsg: string = 'erro') => {
  const api = apiComponent()

  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  const post = async (dados: object) => {
    dispatch({ type: 'REQUEST' })
    try {
      const { data } = await api.post(v1 + resource, dados, { headers: { 'content-type': 'multipart/form-data' } })
      if (Object.keys(data).length > 0) {
        dispatch({ type: 'SUCCESS', data: data })
      } else {
        dispatch({ type: 'FAILURE', error: errorMsg })
      }

      return data
    } catch (e) {
      dispatch({
        type: 'FAILURE',
        error: 'Error do Servidor'
      })
    }
  }
  return { data, post }
}

// export const useDelete = (resource: string, errorMsg: string) => {
//   const api = apiComponent()

//   const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
//   const remove = async (dados: object) => {
//     dispatch({ type: 'REQUEST' })
//     try {
//       const { data } = await api.delete(v1 + resource, dados)
//       if (Object.keys(data).length > 0) {
//         dispatch({ type: 'SUCCESS', data: data })
//       } else {
//         dispatch({ type: 'FAILURE', error: errorMsg })
//       }
//     } catch (e) {
//       dispatch({
//         type: 'FAILURE',
//         error: 'Error do Servidor'
//       })
//     }
//   }
//   return { data, remove }
// }
