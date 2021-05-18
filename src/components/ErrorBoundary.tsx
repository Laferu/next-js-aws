import React, { ErrorInfo } from 'react'

import {
  StyledDetails,
  StyledSummaryContent
} from '@/styles/components/ErrorBoundary'

// interface IErrorInfo {
//   string | { componentStack: Function, }
// }

class ErrorBoundary extends React.Component {
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
        <div>
          <h2>Algo deu errado.</h2>
          {this.state.errorInfo && (
            <StyledDetails className="error-details">
              <summary>Click for error details</summary>
              <StyledSummaryContent>
                {this.state.errorInfo.componentStack.toString()}
              </StyledSummaryContent>

            </StyledDetails>
          )}
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary
