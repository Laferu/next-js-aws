import { GetServerSideProps } from 'next'
// import { Swipe } from '@swp/swipe-sdk'
import sdk from '../sdk'
import parseCookies from "@/functions/parseCookies"

export const newPasswordServerSideProps: GetServerSideProps = async ({ req, params }) => {
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
        const { slug } = params

        if (slug[0] !== 'teste') {
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
      }
    } else {
      const { slug } = params

      if (slug[0] !== 'teste') {
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
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}
