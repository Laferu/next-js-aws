import { IFilterCategoryList } from "./IDropdownList"

export interface IToPerson {
  toDocument: string
  toName: string
  toPerson: string
}

export interface IFromPerson {
  fromDocument: string
  fromName: string
  fromPerson: string
}

export interface ITransactionData {
  id: string
  name: string
  error: any
  amount: string
  fields: any
  status: string
  service: string
  document: string
  toPerson: IToPerson | null
  createdAt: string
  updatedAt: string
  fromPerson: IFromPerson | null
  personType: string
  serviceType: string
  executedOrSettleAt: string

  arr: string,
  method: string,
  positive: boolean,
  methodType: string,
  messageError: any,
  date: string,
  value: string,
  isNegative: boolean
}

export interface ITransactionsData {
  filters: IFilterCategoryList[]
  transactions: ITransactionData[]
  pageCount: number
  currentPage: number
}
