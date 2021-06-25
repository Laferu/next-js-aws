import React, {
  useState,
  createContext
} from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'

import themeJSON from '@/utils/theme.json'
import {
  ITransactionData,
  ITransactionsData
} from '@/Interfaces/history-transaction'
import { IUserData, IUsersData } from '@/Interfaces/users'

interface IState {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isConfirmModal: boolean
  setIsConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  messageConfirmModal: string
  setMessageConfirmModal: React.Dispatch<React.SetStateAction<string>>
  sidebarToggle: boolean
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>
  selectedMenu: string | null
  setSelectedMenu: React.Dispatch<React.SetStateAction<string | null>>
  transactionsData: ITransactionsData
  setTransactionsData: React.Dispatch<React.SetStateAction<ITransactionsData>>
  transactionData: ITransactionData
  setTransactionData: React.Dispatch<React.SetStateAction<ITransactionData>>
  userData: IUserData
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>
  usersData: IUsersData
  setUsersData: React.Dispatch<React.SetStateAction<IUsersData>>
}

interface IFunctions {
  handleConfirmModal: Function
  setHandleConfirmModal: React.Dispatch<React.SetStateAction<Function>>
}

interface IUrl {
  baseUrl: string
  apiUrl: string
}

interface IContext {
  state: IState
  url: IUrl
  functions: IFunctions
}

declare module "styled-components" {
  interface DefaultTheme {
    palette: {
      primary: {
        dark?: string
        main: string
        light?: string
      },
      secondary: {
        dark?: string
        main: string
        light?: string
        lightButton?: string
      },
      borderGray: string,
      white: {
        dark?: string
        main: string
        light?: string
      },
      green: {
        dark?: string
        main: string
        light?: string
      },
      warning: {
        main: string
      },
      danger: {
        main: string
      }
    },
    headerHeight: {
      mobile: string
      desktop: string
    },
    sidebarWidth: {
      w768: string,
      w768Animated: string
    }
    baseUrl: string
  }
}

const theme: DefaultTheme = { ...themeJSON, baseUrl: process.env.REACT_APP_HOST }

export const GlobalContext = createContext<IContext>(null)

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false)
  const [messageConfirmModal, setMessageConfirmModal] = useState<string>('')
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [handleConfirmModal, setHandleConfirmModal] = useState<Function>(null)
  const [transactionsData, setTransactionsData] = useState<ITransactionsData>({
    filters: [],
    transactions: [],
    pageCount: 1,
    currentPage: 1
  })
  const [transactionData, setTransactionData] = useState<ITransactionData>({
    id: '',
    name: '',
    error: null,
    amount: '',
    fields: null,
    status: '',
    service: '',
    document: '',
    toPerson: null,
    createdAt: '',
    updatedAt: '',
    fromPerson: null,
    personType: '',
    serviceType: '',
    executedOrSettleAt: '',

    arr: '',
    method: '',
    positive: true,
    methodType: '',
    messageError: null,
    date: '',
    value: '',
    isNegative: false
  })
  const [usersData, setUsersData] = useState<IUsersData>({
    filters: [],
    users: [],
    pageCount: 1,
    currentPage: 1
  })
  const [userData, setUserData] = useState<IUserData>({
    id: '',
    name: '',
    document: '',
    status: '',
    amount: 0,
  })

  return (
    <GlobalContext.Provider value={{
      state: {
        isLoading,
        setIsLoading,
        isConfirmModal,
        setIsConfirmModal,
        messageConfirmModal,
        setMessageConfirmModal,
        sidebarToggle,
        setSidebarToggle,
        selectedMenu,
        setSelectedMenu,
        transactionsData,
        setTransactionsData,
        transactionData,
        setTransactionData,
        userData,
        setUserData,
        usersData,
        setUsersData
      },
      url: {
        baseUrl: process.env.REACT_APP_HOST,
        apiUrl: process.env.REACT_APP_HOST + '/api'
      },
      functions: {
        handleConfirmModal,
        setHandleConfirmModal
      }
    }}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}
