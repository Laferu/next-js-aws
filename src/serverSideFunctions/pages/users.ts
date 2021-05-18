// import { Swipe } from '@swp/swipe-sdk'
import sdk from '../sdk'
import { loginSession } from '../loginSession'
import { profileData } from '../profileData'

export const usersServerSideProps = async ({ req }) => {
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

export const userTransactionsServerSideProps = async ({ req, params }) => {
  const result = await loginSession(sdk, req)

  try {
    if (result.accountId) {
      const { slug } = params

      const profile = await profileData(sdk, result.accountId)

      const userId = slug[0]

      const { data: user } = await profileData(sdk, userId)


      // console.log('teste', await transactionData())
      // const data = sdk.CashIn.getBoleto(boletoId)

      return {
        props: {
          profile,
          accountId: result.accountId,
          user
        }
      }
    } else {
      return result
     }
  } catch (error) {
    // TODO: VAI SER NECESSÁRIO UMA PÁGINA DE ERRO PARA REDIRECIONAMENTO
    console.log(error)
    return {
      props: {}
    }
    // redirect: {
    //   permanent: false,
    //   destination: "/logout"
    // }
  }
}
