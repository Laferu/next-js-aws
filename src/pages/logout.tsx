import { Swipe } from '@swp/swipe-sdk'
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"

import { loginSession } from '@/serverSideFunctions/loginSession'

const Logout = () => {
  const [, , removeCookie] = useCookies(['@Swipe:userAuthInfo']);
  const { push } = useRouter()

  const removeCookies = useCallback(() => {
    removeCookie('@Swipe:userAuthInfo')
    push('/login')
  }, [])

  useEffect(() => {
    removeCookies()
  }, [removeCookies])

  return <></>
}

export default Logout

export const getServerSideProps = async ({ req }) => {
  const sdk = new Swipe({
    apiKey: process.env.REACT_APP_SDK_API_KEY,
    secret: process.env.REACT_APP_SDK_SECRET,
    customHost: process.env.REACT_APP_SDK_BASE_URL,
    debug: true
  })

  try {
    const { sessionId } = await loginSession(sdk, req)

    const { data } = await sdk.Login.destroySession(sessionId)

    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error)

    return {
      props: {
        data: error
      }
    }
  }
}
