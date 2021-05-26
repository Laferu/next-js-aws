// import { Swipe } from '@swp/swipe-sdk'
import sdk from '../sdk'
import { loginSession } from '../loginSession'
import { profileData } from '../profileData'

export const homeServerSideProps = async ({ req }) => {
  const result = await loginSession(sdk, req)

  try {
    if (result.accountId) {
      const profile = await profileData(sdk, result.accountId)

      return {
        props: {
          profile,
          accountId: result.accountId
        }
      }
    } else { throw Error("error!") }
  } catch (error) {
    console.log(error)
    return result
  }
}
