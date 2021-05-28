import { GetServerSideProps } from 'next'
// import { Swipe } from '@swp/swipe-sdk'
import sdk from '../sdk'
import parseCookies from "@/functions/parseCookies"

export const loginServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const dataCookie = parseCookies(req)

    if (dataCookie['@Swipe:userAuthInfo']) {
      const userAuthInfo = JSON.parse(dataCookie['@Swipe:userAuthInfo'])
      const id = userAuthInfo.sessionId
      const { data: { data: { isLogged } } } = await sdk.Login.isSessionActive(id)

      if (isLogged) {
        return {
          redirect: {
            permanent: false,
            destination: "/"
          }
        }
      } else {
        return {
          props: {}
        }
      }

    } else {
      return {
        props: {
          teste: {
            baseUrl: process.env.REACT_APP_HOST,
            apiKey: process.env.REACT_APP_SDK_API_KEY,
            secret: process.env.REACT_APP_SDK_SECRET,
            customHost: process.env.REACT_APP_SDK_BASE_URL,
          }
        }
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}
