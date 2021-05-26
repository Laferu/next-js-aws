import styled from 'styled-components'

interface ContentPositionProps {
  visible?: boolean
}

export const PaginatedScrollVerticalChild = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const ContentPosition = styled.div<ContentPositionProps>`
  position: relative;
  /* margin-top: 10px; */
  top: -30px;
  height: 24px;
  display: ${e => e.visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: 500;
    color: ${e => e.theme.palette.secondary.dark}
  }
`
