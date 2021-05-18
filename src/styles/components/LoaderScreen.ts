import styled from 'styled-components'

interface LoaderContainerProps {
  isLoading: boolean
  noBackground?: boolean
}

export const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  height: 100vh;
`

export const LoaderContainer = styled.div<LoaderContainerProps>`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  display: ${props => props.isLoading ? 'flex' : 'none'};
  z-index: 2;
`

export const MinLoaderContainer = styled(LoaderContainer)<LoaderContainerProps>`
  background-color: ${e => e.noBackground ? 'transparent' : e.theme.palette.secondary.light};
  z-index: 1;

  h2 {
    color: ${e => e.theme.palette.secondary.dark};
    font-weight: 500;
  }
`
