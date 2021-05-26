// import {
//   ActionBatchDTO,
//   ActionBatchStatus,
//   ActionDTOWithDataObject,
//   Fields,
//   SwpError
// } from '@swp/swipe-sdk'
import sdk from '../sdk'
import { loginSession } from '../loginSession'
import { profileData } from '../profileData'

export const historyTransactionsServerSideProps = async ({ req }) => {
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

// interface IDataCaseDefault {
//   receiver?: object | null,
//   actions?: ActionDTOWithDataObject[]
//   status?: ActionBatchStatus
//   payDate?: string | null
//   executedAt?: string | null
//   createdAt?: string,
//   id?: string,
//   error?: SwpError
//   fields?: Fields
// }

// interface IClient {
//   name?: string
//   cpf?: string
// }

export const transactionDetailsServerSideProps = async ({ req }) => {
  const result = await loginSession(sdk, req)

  const profile = await profileData(sdk, result.accountId)

  // try {
  //   if (result.accountId) {
  //     const { slug } = params

  //     const id = slug[2]

  //     const transactionData = async () => {
  //       const banks = (await sdk.CashOut.getBanks()).data.data
  //       let bankName = ''
  //       let client: IClient = {}
  //       let index = Number(slug[1])
  //       switch (`${slug[0]}-${slug[1]}`) {
  //         case 'cash-in-bank-slip':
  //           const cashInBoleto = (await sdk.CashIn.getBoleto(id)).data.data
  //           client = (await profileData(sdk, cashInBoleto.depositAccount)).data.person
  //           return {
  //             data: cashInBoleto,
  //             profile: { name: client.name, cpf: client.cpf }
  //           }
  //         case 'cash-in-lottery':
  //           const cashInLottery = (await sdk.CashIn.getLotteryCashInById(id)).data.data
  //           client = (await profileData(sdk, cashInLottery.depositAccount)).data.person
  //           return {
  //             data: cashInLottery,
  //             profile: { name: client.name, cpf: client.cpf }
  //           }
  //         case 'cash-in-credit-card':
  //           const cashInCreditCard = (await sdk.CashIn.getCreditCardTransactionById(id)).data.data
  //           client = (await profileData(sdk, cashInCreditCard.depositAccount)).data.person
  //           return {
  //             data: cashInCreditCard,
  //             profile: { name: client.name, cpf: client.cpf }
  //           }

  //         case 'cash-out-bank-slip':
  //           let dataCashOutBoleto = {}
  //           const cashOutBoleto = (await sdk.CashOut.getBoleto(id)).data.data
  //           client = (await profileData(sdk, cashOutBoleto.withdrawAccountId)).data.person

  //           if (cashOutBoleto.barCode[0] !== '8') {
  //             const bankCode = cashOutBoleto.barCode[0] + cashOutBoleto.barCode[1] + cashOutBoleto.barCode[2]
  //             bankName = banks.filter(e => e.code === bankCode)[0].name

  //             dataCashOutBoleto = {
  //               ...cashOutBoleto,
  //               receiver: { name: bankName }
  //             }
  //           } else {
  //             dataCashOutBoleto = {
  //               ...cashOutBoleto,
  //               receiver: { name: '' }
  //             }
  //           }

  //           return {
  //             data: dataCashOutBoleto,
  //             profile: { name: client.name, cpf: client.cpf }
  //           }
  //         case 'cash-out-lottery':
  //           const cashOutLottery = (await sdk.CashOut.getLotteryCashOutById(id)).data.data
  //           client = (await profileData(sdk, cashOutLottery.withdrawAccountId)).data.person
  //           return {
  //             data: cashOutLottery,
  //             profile: { name: client.name, cpf: client.cpf }
  //           }
  //         case 'cash-out-top-up':
  //           const cashOutTopUp = (await sdk.CashOut.getTopUpCashOutById(id)).data.data
  //           client = (await profileData(sdk, cashOutTopUp.withdrawAccountId)).data.person
  //           return {
  //             data: cashOutTopUp,
  //             profile: { name: client.name, cpf: client.cpf }
  //           }
  //         case 'cash-out-bank-ted':
  //           const cahsOutTed = (await sdk.CashOut.getBankTransfer(id)).data.data
  //           client = (await profileData(sdk, cahsOutTed.withdrawAccountId)).data.person
  //           bankName = banks.filter(e => e.code === cahsOutTed.receiver.bankCode)[0].name
  //           return {
  //             data: { ...cahsOutTed, receiver: { ...cahsOutTed.receiver, bankName } },
  //             profile: { name: client.name, cpf: client.cpf, bankName: banks.filter(e => e.code === '633')[0].name }
  //           }

  //         default:
  //           let dataCaseDefault: IDataCaseDefault = {}
  //           const caseDefault = (await sdk.Ledger.getActionBatch(id)).data.data
  //           client = (await profileData(sdk, caseDefault.actions[index].to)).data.person
  //           if (caseDefault.actions[index]?.from) {
  //             const { name, cpf } = (await profileData(sdk, caseDefault.actions[index].from)).data.person
  //             const { name: nameReceiver, cpf: document } = (await profileData(sdk, caseDefault.actions[index].to)).data.person
  //             client = { name, cpf: cpf }

  //             dataCaseDefault = {
  //               ...caseDefault,
  //               receiver: { name: nameReceiver, document }
  //             }
  //           } else {
  //             dataCaseDefault = {
  //               ...caseDefault
  //             }

  //             const { name, cpf } = (await profileData(sdk, caseDefault.actions[index].to)).data.person
  //             client = { name, cpf: cpf }
  //           }

  //           return {
  //             data: {
  //               receiver: dataCaseDefault?.receiver ? {...dataCaseDefault.receiver} : null,
  //               ...dataCaseDefault.actions[index],
  //               status: dataCaseDefault.status,
  //               payDate: dataCaseDefault?.executedAt || null,
  //               createdAt: dataCaseDefault.createdAt,
  //               id: dataCaseDefault.id,
  //               error: dataCaseDefault.error,
  //             },
  //             profile: client
  //           }
  //       }
  //     }

  //     return {
  //       props: {
  //         profile,
  //         accountId: result.accountId,
  //         transactionData: await transactionData()
  //       }
  //     }
  //   } else {
  //     return result
  //    }
  // } catch (error) {
    // TODO: VAI SER NECESSÁRIO UMA PÁGINA DE ERRO PARA REDIRECIONAMENTO
    // console.log(error)
    // const profile = await profileData(sdk, result.accountId)
    return {
      props: {
        profile,
        accountId: result.accountId
        // transactionData: {
        //   data: { error },
        //   profile: {}
        // }
      }
    }
    // redirect: {
    //   permanent: false,
    //   destination: "/logout"
    // }
  // }
}
