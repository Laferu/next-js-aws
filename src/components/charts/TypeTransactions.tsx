import { useCallback, useEffect, useState, Fragment } from 'react'
import { useTheme } from 'styled-components'

import {
  Container,
  TitleContainer,
  Title,
  OptionsButton,
  StyledTableTypeTransactions,
  TdValueTypeTransactions,
  ViewerMore,
  TableTitleContainer
} from '@/styles/components/charts'

interface ITypeTransactions {
  title: string
  value: number
}

const typeTransactions: ITypeTransactions[] = [
  {
    title: 'Transferência para outros bancos',
    value: 30
  },
  {
    title: 'Pagamento de conta consumo',
    value: 15
  },
  {
    title: 'Pagamento de títulos',
    value: 13
  },
  {
    title: 'Transferências internas',
    value: 10
  },
]

const TypeTransactions = () => {
  return (
    <Container height='330px'>
      <header>
        <TableTitleContainer noBorder>
          <Title>Tipo de transações mais utilizadas</Title>
          <OptionsButton />
        </TableTitleContainer>
      </header>
      <StyledTableTypeTransactions>
        <tbody>
          {typeTransactions.map((e, index) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td>{e.title}</td>
                  <TdValueTypeTransactions>{e.value}</TdValueTypeTransactions>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </StyledTableTypeTransactions>
      {typeTransactions.length <= 4 && (
        <ViewerMore>
          Mostrar mais
        </ViewerMore>
      )}
    </Container>
  )
}

export default TypeTransactions
