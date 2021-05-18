import { NextApiRequest, NextApiResponse } from "next";
import {
  SearchOptions
} from '@swp/swipe-sdk'
import sdk from '@/serverSideFunctions/sdk'
import { IFromPerson, IToPerson } from "@/Interfaces/history-transaction";

export interface TransactionData {
  date: Date
  arr: string
  method: string
  positive: boolean
  methodType: string
  status: boolean
}

const historyTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  const accountId = req.query.id
  const limit = Number(req.query.limit)
  const starting_after = Number(req.query.starting_after)
  const queryParams = req.query.queryParams ? JSON.parse((req.query.queryParams).toString()) : {}
  const fields = req.query.fields ? JSON.parse((req.query.fields).toString()) : {}

  const searchOptions: SearchOptions = {
    pagination: {
      limit: limit,
      starting_after: starting_after
    },
    queryParams,
    fields
  }

  // const { data: { data: originalData, pagination } } = await sdk.History.getAllTransactionHistory(accountId.toString(), searchOptions)

  // console.log('bbb', originalData)

  try {
    const {
      data: { data: originalData, pagination }
    } = await sdk.History.getAllTransactionHistory(
      accountId.toString(),
      searchOptions
    )

    const methodType = (service: string, serviceType: string) => {
      if (service === 'ledger') {
        return serviceType === 'transfer' ? 'Transferência P2P'
          : serviceType === 'issue-asset' ? 'Depósito'
          : serviceType === 'burn-asset' ? 'Saque' : 'Any'
      }
      if (service === 'cash-in') {
        if (serviceType === 'lottery') {
          return 'Depósito - Lotérica'
        }
        if (serviceType === 'bank-slip') {
          return 'Depósito - Boleto'
        }
        if (serviceType === 'credit-card') {
          return 'Depósito - Cartão'
        }
      }
      if (service === 'cash-out') {
        if (serviceType === 'lottery') {
          return 'Pagamento - Lotérica'
        }
        if (serviceType === 'top-up') {
          return 'Recarga'
        }
        if (serviceType === 'bank-slip') {
          return 'Pagamento - Boleto'
        }
        if (serviceType === 'bank-ted') {
          return 'TED'
        }
      }
      return 'Any'
    }

    const formatedStatus = (e: string) => {
      if (e === 'PAID' || e === 'SUCCESS') return 'SUCCESS'
      if (
        e === 'PROCESSING' ||
        e === 'CREATED' ||
        e === 'PENDING' ||
        e === 'WARNING' ||
        e === 'AWAITING_CONFIRMATION'
      ) return 'WARNING'
      if (e === 'ERROR' || e === 'FAILED' || e === 'CANCELLED') return 'ERROR'
    }

    const isValuePositive = (
      service: string,
      serviceType: string,
      document: string,
      fromPerson: IFromPerson,
      toPerson: IToPerson
    ) => {

      if (service === 'ledger') {
        if (serviceType === 'burn-asset') {
          return false
        }
        if (serviceType === 'issue-asset') {
          return true
        }
        if (serviceType === 'transfer') {
          if (fromPerson) {
            return true
          }
          if (toPerson) {
            return false
          }

          return false
        }
      }
      // const positive = e.data.type === 'TRANSFER'
      //   ? e.data.to === accountId ? true : false
      //   : e.data.type === 'ISSUE_ASSET' ? true : false
      if (service === 'cash-out') {
        return false
      }
      if (service === 'cash-in') {
        return true
      }

      return false
    }

    // let newArray = []
    const newArray = originalData.map(e => {
      const service = e.service.replace('_', '-').toLowerCase()
      const serviceType = e.serviceType.replace('_', '-').toLowerCase()
      return {
        ...e,
        // arr: 'cash-in',
        arr: service,
        method: serviceType,
        positive: isValuePositive(
          service,
          serviceType,
          e.document,
          e.fromPerson,
          e.toPerson
        ),
        methodType: methodType(service, serviceType),
        status: formatedStatus(e.status),
        messageError: e?.error || null
      }
    })

    // newArray.push(...originalData.cashIn.boleto.map(e => ({ ...e, arr: 'cash-in', method: 'boleto', date: e.createdAt, positive: true, methodType: 'Depósito - Boleto', status: formatedStatus(e.status), messageError: e?.error?.message || null })))
    // newArray.push(...originalData.cashIn.credit_card.map(e => ({ ...e, arr: 'cash-in', method: 'credit-card', date: e.createdAt, positive: true, methodType: 'Depósito - Cartão', status: formatedStatus(e.status), messageError: e?.error?.message || null })))
    // newArray.push(...originalData.cashIn.lottery.map(e => ({ ...e, arr: 'cash-in', method: 'lottery', date: e.createdAt, positive: true, methodType: 'Depósito - Lotérica', status: formatedStatus(e.status), messageError: e?.error?.message || null })))

    // newArray.push(...originalData.cashOut.boleto.map(e => ({ ...e, arr: 'cash-out', method: 'boleto', date: e.createdAt, positive: false, methodType: 'Pagamento - Boleto', status: formatedStatus(e.status), messageError: e?.error?.message || null })))
    // newArray.push(...originalData.cashOut.lottery.map(e => ({ ...e, arr: 'cash-out', method: 'lottery', date: e.createdAt, positive: false, methodType: 'Saque - Lotérica', status: formatedStatus(e.status), messageError: e?.error?.message || null })))
    // newArray.push(...originalData.cashOut.ted.map(e => ({ ...e, arr: 'cash-out', method: 'ted', date: e.createdAt, positive: false, methodType: 'TED', status: formatedStatus(e.status), messageError: e?.error?.message || null })))
    // newArray.push(...originalData.cashOut.top_up.map(e => ({ ...e, arr: 'cash-out', method: 'top-up', date: e.createdAt, positive: false, methodType: 'Recarga', status: formatedStatus(e.status), messageError: e?.error?.message || null })))

    // originalData.ledger.actionBatch.map((arr) => {
    //   const { executedAt, id, error } = arr
    //   newArray.push(...arr.actions.map((e, index) => {

    //     const positive = e.data.type === 'TRANSFER'
    //       ? e.data.to === accountId ? true : false
    //       : e.data.type === 'ISSUE_ASSET' ? true : false

    //     const methodType = e.data.type === 'TRANSFER' ? 'Transferência entre contas'
    //       : e.data.type === 'ISSUE_ASSET' ? 'Depósito'
    //       : e.data.type === 'BURN_ASSET' ? 'Saque' : 'Any'

    //     if (error && index >= error.subErrors[0].index) {
    //       return { ...e.data, arr: 'ledger', date: executedAt, status: 'ERROR', messageError: error.subErrors[0].msg, id, positive, actionId: e.data.assetId, methodType, index }
    //     }
    //     else {
    //       return { ...e.data, arr: 'ledger', date: executedAt, status: 'SUCCESS', messageError: null, id, positive, actionId: e.data.assetId, methodType, index }
    //     }
    //   }))
    // })

    // const orderDate = (a: TransactionData, b: TransactionData) => {
    //   const dateA = new Date(a.date).getTime()
    //   const dateB = new Date(b.date).getTime()

    //   return dateB - dateA;
    // }

    // newArray.sort(orderDate)

    // const data: TransactionData[] = realLimit === 0 ? [...newArray] : newArray.sort(orderDate).slice(0, realLimit)

    res.json({ data: newArray, pagination })
  } catch (error) {
    res.json({ data: error })
  }
}

export default historyTransactions
