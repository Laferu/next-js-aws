import React, { ErrorInfo } from 'react'

// import {
//   StyledDetails,
//   StyledSummaryContent
// } from '@/styles/components/ErrorBoundary'

import { ErrorBondaryContainer } from '@/styles/components/charts'

// interface IErrorInfo {
//   string | { componentStack: Function, }
// }

class ChartErrorBoundary extends React.Component {
  state = {
    error: '',
    errorInfo: {} as ErrorInfo,
    hasError: false
  }

  static getDerivedStateFromError(error, errorInfo) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true, errorInfo: errorInfo };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erro
    // logErrorToMyService(error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return (
        <ErrorBondaryContainer>
          <h2>Não foi possível exibir os dados.</h2>
          {/* {this.state.errorInfo && (
            <StyledDetails className="error-details">
              <summary>Click for error details</summary>
              <StyledSummaryContent>
                {this.state.errorInfo.componentStack.toString()}
              </StyledSummaryContent>
            </StyledDetails>
          )} */}
        </ErrorBondaryContainer>
      )
    }

    return this.props.children;
  }
}

export default ChartErrorBoundary
