import React from 'react'
import { render } from '@testing-library/react'
import DropdownFilter from '@/components/DropdownFilter'
import { GlobalProvider } from '@/utils/Context'
import GlobalStyles from '@/styles/GlobalStyles'
import providerProps from '@/__mocks__/providerProps'
import { IFilterCategoryList } from '@/Interfaces/IDropdownList'

// jest.mock('react', () => {
//   return {
//     useContext: jest.fn()
//   }
// })

const profile = {
  person: {
    name: 'Rafael'
  }
}

const customRender = (ui: JSX.Element, { providerProps, ...renderOptions }: { providerProps: { url: { baseUrl: string } } }) => {
  return render(
    <GlobalProvider>
      <GlobalStyles />
      {ui}
    </GlobalProvider>,
    renderOptions
  )
}

const listFilterMenu: IFilterCategoryList[] = [
  {
    name: 'Status',
    fieldName: 'status',
    type: 'select',
    value: null,
    list: [
      {
        name: 'Aprovado',
        fieldValue: 'SUCCESS,PAID',
        checked: false
      },
      {
        name: 'Pendente',
        fieldValue: 'PENDING,CREATED,AWAITING_CONFIRMATION,PROCESSING,WARNING',
        checked: false
      },
      {
        name: 'Recusado',
        fieldValue: 'FAILED,ERROR,CANCELLED',
        checked: false
      },
    ]
  },
  {
    name: 'Data',
    fieldName: 'date',
    type: 'date',
    value: null,
    date: [
      new Date(),
      new Date()
    ]
  },
  {
    name: 'Tipo de transação',
    fieldName: 'type',
    type: 'select',
    value: null,
    list: [
      {
        name: 'Pagamento - Boleto',
        categoryValue: 'CASH_OUT',
        fieldValue: 'BANK_SLIP',
        checked: false
      },
      {
        name: 'Depósito - Boleto',
        categoryValue: 'CASH_IN',
        fieldValue: 'BANK_SLIP',
        checked: false
      },
      {
        name: 'Cartão de crédito',
        // categoryValue: 'CASH_IN',
        fieldValue: 'CREDIT_CARD',
        checked: false
      },
      {
        name: 'TED',
        // categoryValue: 'CASH_OUT',
        fieldValue: 'BANK_TED',
        checked: false
      },
      {
        name: 'Transferência P2P',
        // categoryValue: 'LEDGER',
        fieldValue: 'TRANSFER',
        checked: false
      }
    ]
  },
  {
    name: 'Valor',
    fieldName: 'amount',
    type: 'search',
    format: 'money',
    value: [null, null]
  },
  {
    name: 'Cliente',
    fieldName: 'client',
    type: 'search',
    value: ''
  },
  {
    name: 'CPF',
    fieldName: 'cpf',
    type: 'search',
    format: 'cpf',
    value: ''
  },
  // {
  //   name: 'Categoria',
  // },
]

describe('Dropdown Filter Component', () => {

  it('', () => {
    const { debug } = customRender(
      <DropdownFilter
        state={{
          list: listFilterMenu,
          setList: () => {}
        }}
        action={() => {}}
        width='1000px'
      />,
      { providerProps }
    )

    debug()
  })
})
