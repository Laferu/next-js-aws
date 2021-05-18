import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { useTheme } from 'styled-components'

import { MinLoaderContainer } from "@/styles/components/LoaderScreen"

interface LoadingProps {
  children: ReactNode
  isLoading: boolean
  errorMessage: string
  isError: boolean
  min?: boolean
  noBackground?: boolean
}

const Loader = dynamic(
  () => import('react-loader-spinner'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const Loading = ({
  isLoading,
  errorMessage,
  isError,
  min = false,
  noBackground = false,
  children
}: LoadingProps) => {

  const theme = useTheme()

  const size = min ? 20 : 50

  return (
    <>
      {children}
      <MinLoaderContainer
        isLoading={isLoading || isError}
        noBackground={noBackground}
      >
        {isLoading && !isError && (
          <Loader
            type="TailSpin"
            color={theme.palette.primary.dark}
            height={size}
            width={size}
            visible={isLoading}
          />
        )}
        {isError && (
          <h2>{errorMessage}</h2>
        )}
      </MinLoaderContainer>
    </>
  )
}

export default Loading
