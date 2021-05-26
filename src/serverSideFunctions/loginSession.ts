import parseCookies from "@/functions/parseCookies"

export const loginSession = async ( sdk, req ) => {
  try {
    const dataCookie = parseCookies(req)

    if (dataCookie['@Swipe:userAuthInfo']) {
      const userAuthInfo = JSON.parse(dataCookie['@Swipe:userAuthInfo'])
      const id = userAuthInfo.sessionId
      const { data: { data } } = await sdk.Login.isSessionActive(id)

      if (!data.isLogged) {
        return {
          redirect: {
            permanent: false,
            destination: "/logout"
          }
        }
      }
      else {
        const { accountId, sessionId, login } = data

        if (accountId && sessionId) {
          return { accountId, sessionId, login }
        }

        return {
          redirect: {
            permanent: false,
            destination: "/logout"
          }
        }
      }

    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/logout"
        }
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/logout"
      }
    }
  }
}
