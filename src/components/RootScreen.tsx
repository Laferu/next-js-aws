import { ReactNode, useContext, useState } from 'react'
import { useTheme } from 'styled-components'

import { GlobalContext } from '@/utils/Context';
import { Container, LoaderContainer } from '@/styles/components/LoaderScreen'

import dynamic from 'next/dynamic'

const Loader = dynamic(
  () => import('react-loader-spinner'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const ConfirmModal = dynamic(
  () => import('@/components/ConfirmModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

interface RootScreenProps {
  children: ReactNode
}

const RootScreen = ({ children }: RootScreenProps) => {
  const { state: {
      isLoading,
      isConfirmModal,
      messageConfirmModal
    }, functions: {
      handleConfirmModal
    } } = useContext(GlobalContext)

    const theme = useTheme()

    return (
      <Container>
        {children}
        {isConfirmModal && (
          <ConfirmModal
            confirm={handleConfirmModal}
            message={messageConfirmModal}
          />
        )}
        <LoaderContainer isLoading={isLoading}>
          {isLoading && (
            <Loader
              type="TailSpin"
              color={theme.palette.primary.dark}
              height={100}
              width={100}
              visible={isLoading}
            />
          )}
        </LoaderContainer>
      </Container>
    )
}

export default RootScreen
