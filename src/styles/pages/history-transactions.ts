import styled from 'styled-components'
import { Icon } from '../GlobalStyles'

interface IconProps {
  status: string
}

export const StyledHeader = styled.header`
  /* padding: 0 15px; */

  @media screen and (min-width: 768px) {
    /* padding: 0 30px; */
  }
`

export const TitleContainer = styled.div`
  padding: 0 10px;
  margin-bottom: 15px;
`

export const TitleArrowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: -30px;
`

export const Arrow = styled.div`
  mask: url('/assets/icons/arrow-left.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.primary.main};
  width: 30px;
  height: 22px;
  margin-right: 20px;

  &:hover, &:active {
    opacity: .6;
    cursor: pointer;
  }

  a {
    display: block;
    height: 100%;
    width: 100%;
  }
`

export const TableWrapper = styled.div`
  max-height: 500px;
  display: flex;
  width: 100%;
  flex-direction: column;

  td[data-label='Categoria'] {
    text-transform: capitalize;
  }
`

export const LegendContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 70px;
  margin-bottom: 30px;
  column-gap: 20px;

  p {
    padding-left: 10px;
    font-size: 10px;
    color: ${e => e.theme.palette.secondary.dark};
    font-weight: 500;

    @media screen and (min-width: 768px) {
      padding-left: 15px;
      font-size: 14px;
    }
  }
`

export const TdStatus = styled.td<IconProps>`
  color: ${({ status, theme }) => {
    if (status === 'SUCCESS') return theme.palette.green.dark
    if (status === 'WARNING') return theme.palette.warning.main
    if (status === 'ERROR') return theme.palette.danger.main
  }};
`

export const IconLegend = styled(Icon)`
  &&:before {
    width: 20px;
    height: 20px;
  }
`

export const Legend = styled.div`
  display: flex;
  align-items: center;
`

export const TicketInformationTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: ${e => e.theme.palette.primary.main};
  height: 55px;
  display: flex;
  align-items: center;
`

export const TicketInformationRow = styled.div`
  border-top: 1px solid ${e => e.theme.palette.secondary.lightButton};
  height: 55px;
  padding-top: 8px;

  h6 {
    font-size: 10px;
    font-weight: 500;
    color: ${e => e.theme.palette.secondary.dark};
    padding-bottom: 5px;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${e => e.theme.palette.secondary.dark};
  }

  a {
    font-size: 14px;
    font-weight: 500;
    display: block;

    &:link, &:visited {
      color: ${e => e.theme.palette.secondary.dark};
      text-decoration: none;
    }

    &:hover, &:active {
      text-decoration: underline
    }
  }
`
