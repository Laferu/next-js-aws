import {
  useEffect,
  useCallback,
  // useState,
  useContext
} from 'react'
import {
  transactionDetailsServerSideProps
} from '@/serverSideFunctions/pages/history-transactions'
// import { useGet } from '@/hooks/useRest'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PerfectScrollbar from '@/components/PerfectScrollbar'

import { GlobalContext } from '@/utils/Context'
import formatMoney from '@/utils/formatMoney';
import { cpfMask } from '@/utils/masks'
import Header from "@/components/Header"
import SEO from "@/components/SEO"
import Sidebar from "@/components/Sidebar"
import BreadCrumb from '@/components/BreadCrumb'
import {
  Wrapper,
  StyledMain,
  Title,
  VerticalTable,
  ShadowBox,
  TableContainer
} from "@/styles/GlobalStyles"
import {
  StyledHeader,
  TableWrapper,
  TdStatus,
  TitleContainer,
  TitleArrowContainer,
  Arrow,
  // TicketInformationTitle,
  // TicketInformationRow
} from '@/styles/pages/history-transactions'
import TableErrorBoundary from '@/components/TableErrorBoundary'

const TransactionDetails = ({ profile }) => {
  const {
    url,
    state: { setSelectedMenu, transactionData: transactionContextData }
  } = useContext(GlobalContext)
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    return () => {
      setSelectedMenu(null)
    }
  }, [])

  const formatedStatus = useCallback((e: string) => {
    if (e === 'PAID' || e === 'SUCCESS') return 'SUCCESS'
    if (
      e === 'PROCESSING' ||
      e === 'CREATED' ||
      e === 'PENDING' ||
      e === 'AWAITING_CONFIRMATION' ||
      e === 'WARNING'
    ) return 'WARNING'
    if (
      e === 'ERROR' ||
      e === 'FAILED' ||
      e === 'CANCELLED' ||
      e === 'ERROR'
    ) return 'ERROR'
  }, [])

  const translatedStatus = useCallback((e: string) => {
    if (e === 'PAID') return 'Pago'
    if (e === 'SUCCESS') return 'Concluído'
    if (e === 'PROCESSING') return 'Processando'
    if (e === 'AWAITING_CONFIRMATION') return 'Aguardando confirmação'
    if (e === 'WARNING') return 'Aguardando confirmação'
    if (e === 'CREATED') return 'Criado'
    if (e === 'ERROR') return 'Erro'
    if (e === 'FAILED') return 'Erro'
    if (e === 'CANCELLED') return 'Cancelado'
  }, [])

  const goBack = useCallback(() => router.back(), [])

  const pages = slug[3] && slug[4]
    ? ([
      {
        name: 'Usuários',
        url: `${url.baseUrl}/users`
      },
      {
        name: slug[3],
        url: `${url.baseUrl}/users/${slug[4]}`
      },
      {
        name: `Transação ${slug[2]}`,
        url: `${url.baseUrl}/history-transactions/${Array.isArray(slug) && slug.join('/')}`
      }
    ]) : ([
      {
        name: 'Histórico de transações',
        url: `${url.baseUrl}/history-transactions`
      },
      {
        name: `Transação ${slug[2]}`,
        url: `${url.baseUrl}/history-transactions/${Array.isArray(slug) && slug.join('/')}`
      }
    ])

  // const methodType = useCallback((e: string) => {
  //   if (slug[0] === 'ledger') {
  //     return e === 'transfer' ? 'Transferência entre contas'
  //     : e === 'issue_asset' ? 'Depósito'
  //     : e === 'burn_asset' ? 'Saque' : 'Any'
  //   }
  //   if (slug[0] === 'cash-in') {
  //     if (slug[1] === 'lottery') {
  //       return 'Depósito - Lotérica'
  //     }
  //     if (slug[1] === 'bank-slip') {
  //       return 'Depósito - Boleto'
  //     }
  //     if (slug[1] === 'credit-card') {
  //       return 'Depósito - Cartão'
  //     }
  //   }
  //   if (slug[0] === 'cash-out') {
  //     if (slug[1] === 'lottery') {
  //       return 'Pagamento - Lotérica'
  //     }
  //     if (slug[1] === 'top-up') {
  //       return 'Recarga'
  //     }
  //     if (slug[1] === 'bank-slip') {
  //       return 'Pagamento - Boleto'
  //     }
  //     if (slug[1] === 'bank-ted') {
  //       return 'TED'
  //     }
  //   }
  // }, [slug])

  return (
    <>
      <SEO
        title='Swipe - Histórico de Transações'
        shouldExcludeTitleSuffix
        image='logo.png'
        shouldIndexPage={false}
      />
      <Header profile={profile.data} />
      <Wrapper>
        <PerfectScrollbar>
          <StyledMain>
            <BreadCrumb
              pages={pages}
            />
            <StyledHeader>
              <TitleContainer>
                <TitleArrowContainer>
                  <Arrow>
                    <a title='Histórico de transações' onClick={goBack} />
                  </Arrow>
                  <Title>Transação {slug[2]}</Title>
                </TitleArrowContainer>
              </TitleContainer>
            </StyledHeader>
            <ShadowBox width='820px' className='mt-40'>
              <TableContainer>
                <TableErrorBoundary>
                  <TableWrapper>
                    <VerticalTable titleBlue>
                      <thead>
                        <tr>
                          <th>Status</th>
                          {transactionContextData.error?.message
                            && <th>Mensagem de erro</th>
                          }
                          <th>Tipo de transação</th>
                          {/* <th>Categoria</th> */}
                          {slug[1] === 'bank-slip' && (
                            <>
                              <th>Data de emissão</th>
                              <th>Data de pagamento</th>
                            </>
                          )}
                          {slug[1] === 'bank-ted' && (
                            <>
                              <th>Data da transação</th>
                            </>
                          )}
                          <th>Valor</th>
                          <th>Id da transação</th>
                          {slug[0] === 'cash-in' && slug[1] === 'bank-slip' && (
                            <>
                              <th>Cliente</th>
                              <th>CPF</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <TdStatus
                            status={formatedStatus(transactionContextData?.status || 'ERROR')}
                            data-label='Status'
                          >
                            {translatedStatus(transactionContextData?.status) || 'ERROR'}
                          </TdStatus>
                          {transactionContextData.error?.message
                            && <td data-label='Mensagem de erro'>{transactionContextData.error.message}</td>
                          }
                          <td data-label='Tipo de transação'>
                            {/* {methodType(transactionData.data?.type || '-')} */}
                            {transactionContextData.methodType}
                          </td>
                          {/* <td data-label='Categoria' style={{ textTransform: 'capitalize' }}>
                            {slug[0]}
                          </td> */}
                          {slug[1] === 'bank-slip' && (
                            <>
                              <td data-label='Data de emissão'>{transactionContextData?.createdAt ? format(new Date(transactionContextData?.createdAt), 'dd/MM/yyyy') : '-'}</td>
                              <td data-label='Data de pagamento'>
                                {transactionContextData?.executedOrSettleAt
                                  ? format(new Date(transactionContextData.executedOrSettleAt), 'dd/MM/yyyy')
                                  : '-'
                                }
                                {/* - */}
                              </td>
                            </>
                          )}
                          {(
                            slug[1] === 'bank-ted'
                            || slug[0] === 'ledger'
                          ) && (
                            <>
                              <td data-label='Data da transação'>
                                {transactionContextData?.createdAt
                                  ? format(new Date(transactionContextData?.createdAt),
                                  'dd/MM/yyyy')
                                  : '-'}
                                </td>
                            </>
                          )}
                          <td data-label='Valor'>{transactionContextData?.amount ? formatMoney(Number(transactionContextData?.amount)) : '-'}</td>
                          <td data-label='Id da transação'>{transactionContextData.id}</td>

                          {slug[0] === 'cash-in' && slug[1] === 'bank-slip' && (
                            <>
                              <td data-label='Cliente'>{transactionContextData?.name ? transactionContextData.name.split(' ')[0] : '-'}</td>
                              {/* <td data-label='CPF'>{transactionData?.profile?.cpf ? cpfMask(transactionData.profile.cpf).formatedValue : '-'}</td> */}
                              <td data-label='CPF'>{transactionContextData.document ? cpfMask(transactionContextData.document).formatedValue : '-'}</td>
                            </>
                          )}
                        </tr>
                      </tbody>
                    </VerticalTable>
                  </TableWrapper>
                </TableErrorBoundary>
              </TableContainer>
            </ShadowBox>
            {/* {slug[0] === 'cash-in' && slug[1] === 'bank-slip' && (
              <ShadowBox width='820px' className='mt-40'>
                <TableContainer>
                  <TableErrorBoundary>
                    <TableWrapper>
                      <TicketInformationTitle>
                        Informações de boleto
                      </TicketInformationTitle>
                      <TicketInformationRow>
                        <h6>Código do boleto</h6>
                        <p>
                          {transactionData?.data?.barCode}
                        </p>
                      </TicketInformationRow>
                    </TableWrapper>
                  </TableErrorBoundary>
                </TableContainer>
              </ShadowBox>
            )} */}
            {/* {(
              slug[1] === 'bank-ted'
                || slug[1] === 'lottery'
                || slug[1] === 'credit-card'
                || slug[1] === 'top-up'
                || slug[0] === 'ledger'
                || slug[0] === 'cash-out'
            ) && (
              <> */}
                {/* {(slug[0] === 'cash-out' && slug[1] === 'bank-slip') && (
                  <ShadowBox width='820px' className='mt-40'>
                    <TableContainer>
                      <TableErrorBoundary>
                        <TableWrapper>
                          <TicketInformationTitle>
                            Informações do boleto
                          </TicketInformationTitle>
                          <VerticalTable>
                            <thead>
                              <tr>
                                <th>Favorecido</th>
                                <th>Vencimento</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td data-label='Favorecido'>{transactionData?.data.receiver.name || '-'}</td>
                                <td data-label='Vencimento'>-</td>
                              </tr>
                            </tbody>
                          </VerticalTable>
                          <TicketInformationRow>
                            <h6>Código do boleto</h6>
                            <p>
                              {transactionData?.data?.barCode}
                            </p>
                          </TicketInformationRow>
                        </TableWrapper>
                      </TableErrorBoundary>
                    </TableContainer>
                  </ShadowBox>
                )} */}

                {/* TODO: */}
                {/* {(transactionData?.data?.receiver && slug[1] !== 'bank-slip') && (
                  <ShadowBox width='820px' className='mt-40'>
                    <TableContainer>
                      <TableErrorBoundary>
                        <TableWrapper>
                          <TicketInformationTitle>
                            Informações do destinatário
                          </TicketInformationTitle>
                          <VerticalTable>
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                {transactionData?.data?.receiver?.bankAgency && (
                                  <>
                                    <th>Instituição</th>
                                    <th>Agência</th>
                                    <th>Conta</th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td data-label='Nome'>{transactionData?.data?.receiver?.name}</td>
                                <td data-label='CPF'>
                                  {transactionData?.data?.receiver?.document ? cpfMask(transactionData.data.receiver.document).formatedValue : '-'}
                                </td>
                                {transactionData?.data?.receiver?.bankAgency && (
                                  <>
                                    <td data-label='Instituição'>{transactionData?.data?.receiver?.bankName}</td>
                                    <td data-label='Agência'>
                                    {transactionData?.data?.receiver?.bankAgency}
                                    {transactionData?.data?.receiver?.bankAgencyDigit
                                      && '-' + transactionData?.data?.receiver?.bankAgencyDigit}
                                    </td>
                                    <td data-label='Conta'>
                                      {transactionData?.data?.receiver?.bankAccount}
                                      {transactionData?.data?.receiver?.bankAccountDigit
                                        && '-' + transactionData?.data?.receiver?.bankAccountDigit}
                                    </td>
                                  </>
                                )}
                              </tr>
                            </tbody>
                          </VerticalTable>
                        </TableWrapper>
                      </TableErrorBoundary>
                    </TableContainer>
                  </ShadowBox>
                )} */}

                {/* <ShadowBox width='820px' className='mt-40'>
                  <TableContainer>
                    <TableErrorBoundary>
                      <TableWrapper>
                        <TicketInformationTitle>
                          {transactionData?.data?.receiver
                            ? 'Informações do pagador'
                            : 'Informações do destinatário'}
                        </TicketInformationTitle>
                        <VerticalTable>
                          <thead>
                            <tr>
                              <th>Nome</th>
                              {transactionData?.profile?.bankName ? (
                                <>
                                  <th>Instituição</th>
                                  <th>Agência</th>
                                  <th>Conta</th>
                                </>
                              ) : (
                                <th>CPF</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td data-label='Nome'>{transactionData?.profile?.name}</td>
                              {transactionData?.profile?.bankName ? (
                                <>
                                  <td data-label='Instituição'>{transactionData?.profile?.bankName}</td>
                                  <td data-label='Agência'>-</td>
                                  <td data-label='Conta'>-</td>
                                </>
                              ) : (
                                <></>
                                // <td data-label='CPF'>{cpfMask(transactionData.profile.cpf).formatedValue}</td>
                              )}
                            </tr>
                          </tbody>
                        </VerticalTable>
                      </TableWrapper>
                    </TableErrorBoundary>
                  </TableContainer>
                </ShadowBox> */}
              {/* </> */}
            {/* )} */}
          </StyledMain>
        </PerfectScrollbar>
        <Sidebar />
      </Wrapper>
    </>
  )
}

export default TransactionDetails

export const getServerSideProps = transactionDetailsServerSideProps
