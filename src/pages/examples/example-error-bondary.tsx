import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import ErrorBoundary from '@/components/ErrorBoundary'

interface ExampleErrorBondaryProps {
  desactiveComponentError: boolean
}

const ComponentError = dynamic(
  () => import ('@/components/examples/ComponentError'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const ExampleErrorBondary = ({ desactiveComponentError }: ExampleErrorBondaryProps) => {
  return (
      <div>
        <SEO
          title='Swipe'
          shouldExcludeTitleSuffix
          image='logo.png'
        />
        <p>Conteúdo fora do erro</p>
        <ErrorBoundary>
          <div>
            {!desactiveComponentError ? (
              <ComponentError />
            ) : (
              <p>Sem erro</p>
            )}
          </div>
        </ErrorBoundary>
      </div>
  )
}

export default ExampleErrorBondary
