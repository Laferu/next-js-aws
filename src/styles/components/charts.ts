import styled from 'styled-components'
import PerfectScrollbar, { ScrollBarProps } from '@/components/PerfectScrollbar'

interface ContainerProps extends ScrollBarProps {
  height: string;
}

interface TabProps {
  active: boolean
}

interface IconCardProps {
  icon: string
}

interface CustomBarProps {
  width: string
  color: string
}

interface TdValueProps {
  isNegative: boolean
}

interface IconProps {
  status: string
}

interface TableProps {
  height?: string;
  isScrollable?: boolean
}

interface TableTitleContainerProps {
  noBorder?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${e => e.height};
  overflow: hidden;
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 20px;

  .axis-svg-text {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    padding: 10px 0;
  }

  .clicked {
    cursor: pointer;
    &:hover, &:active {
      opacity: 0.6;
    }
  }
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
`

export const Title = styled.h2`
  color: ${e => e.theme.palette.secondary.dark};
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 40px);
`

export const OptionsButton = styled.button`
  background: url('/assets/icons/options-icon.svg') no-repeat;
  height: 10px;
  width: 24px;
`

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 60px;
  padding-bottom: 30px;

  @media screen and (min-width: 768px) {
    column-gap: 70px;
  }
`

export const Tab = styled.button<TabProps>`
  div {
    font-size: 14px;
    font-weight: 500;
    color: ${({theme, active}) => active ? theme.palette.primary.main : theme.palette.secondary.dark};
  }
`

export const CardValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`

export const CardIcon = styled.span<IconCardProps>`
  mask: url('/assets/icons/${e => e.icon}.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.primary.main};
  width: 40px;
  height: 40px;
  /* margin-left: 10px; */

  @media screen and (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`

export const CardValue = styled.p`
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 24px;
  color: ${e => e.theme.palette.secondary.dark};
  font-weight: 500;
  margin-left: 15px;

  @media screen and (min-width: 768px) {
    height: 40px;
    font-size: 32px;
  }
`

export const FakeChartBar = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

export const CustomLabelBarContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CustomBarContainer = styled.div`
  display: flex;
  width: 100%;
`

export const CustomLabel = styled.p`
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: ${e => e.theme.palette.secondary.dark};
`

export const CustomBar = styled.div<CustomBarProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${e => e.color};
  color: ${e => e.theme.palette.white.main};
  width: ${e => e.width};
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
  font-weight: 500;
  transition: 1s width linear;
`

export const TableTitleContainer = styled(TitleContainer)<TableTitleContainerProps>`
  padding-bottom: 15px;
  border-bottom: ${e => e.noBorder && 'none '}1px solid ${e => e.theme.palette.borderGray};
`

export const TableContainer = styled.div<TableProps>`
  height: ${e => e.isScrollable ? '250px' : '220px'};
  display: flex;
  width: 100%;
  flex-direction: column;

  .ps__rail-y {
    z-index: 1;
  }
`

export const ScrollableTableContainer = styled(PerfectScrollbar)`
  display: flex;
  width: 100%;
  flex-direction: column;

  .ps__rail-y {
    z-index: 1;
  }
`

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  color: ${e => e.theme.palette.secondary.dark};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  border-collapse: collapse;
  position: relative;

  tr {
    height: 55px;
  }

  tbody {
    border-bottom: 4px solid ${e => e.theme.palette.secondary.light};

    tr {
      border-top: 1px solid ${e => e.theme.palette.borderGray};
      height: 55px;
    }
  }

  th {
    font-weight: 500;
    position: sticky;
    background-color: white;
    top: 0;
    z-index: 1;
  }

  tr td:first-child, tr th:first-child  {
    text-align: center;
  }
`

export const StyledTableTransactions = styled.table`
  color: ${e => e.theme.palette.secondary.dark};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  border-collapse: collapse;
  position: relative;

  thead {
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

    @media screen and (min-width: 768px) {
      height: auto;
      margin: 0;
      overflow: auto;
      position: static;
      width: auto;
    }
  }

  tr {
    @media screen and (min-width: 768px) {
      height: 55px;
    }
  }

  tbody {
    border-bottom: none;

    tr {
      border-bottom: 3px solid ${e => e.theme.palette.borderGray};
    }

    @media screen and (min-width: 768px) {
      border-bottom: 4px solid ${e => e.theme.palette.secondary.light};

      tr {
        border-top: 1px solid ${e => e.theme.palette.borderGray};
        border-bottom: none;
        height: 55px;
      }
    }
  }

  th {
    font-weight: 500;
    position: sticky;
    background-color: white;
    top: 0;
    z-index: 1;
    text-align: left;
    line-clamp: 2;

    @media screen and (min-width: 768px) {
      font-weight: 500;
      position: sticky;
      background-color: white;
      top: 0;
      z-index: 1;
    }
  }

  td {
    border-bottom: 1px solid ${e => e.theme.palette.borderGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    text-align: right;
    height: 20px;
    word-wrap: break-word;
    line-clamp: 2;
    overflow:hidden;
    text-overflow:ellipsis;

    &:before {
      content: attr(data-label);
      font-size: 10px;
      padding-right: 20px;
      white-space: nowrap;
      color: ${e => e.theme.palette.secondary.dark};
    }

    &:last-child {
      border-bottom: 0;
    }

    @media screen and (min-width: 768px) {
      box-sizing: border-box;
      border: 0;
      display: table-cell;
      font-size: 14px;
      text-align: left;
      background-color: white;
      padding-right: 10px;
      height: auto;
      max-width: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:before {
      @media screen and (min-width: 768px) {
        content: none;
        font-size: 14px;
      }
    }

    &:first-child {
      @media screen and (min-width: 768px) {
        text-align: center;
      }
    }
  }

  tr td:first-child, tr th:first-child {
    text-align: center;
  }
`

export const StyledTableTypeTransactions = styled(StyledTable)`
  tr td:first-child, tr th:first-child  {
    text-align: left;
  }
`

export const TdValue = styled.td<TdValueProps>`
  color: ${e => e.isNegative ? e.theme.palette.danger.main : e.theme.palette.green.dark};
`

export const TdValueTypeTransactions = styled.td`
  color: ${e => e.theme.palette.primary.dark};
  text-align: right;
`

export const Icon = styled.div<IconProps>`
  display: flex;
  justify-content: center;

  &:before {
    content: '';
    mask: url('/assets/icons/${({ status }) => status === 'SUCCESS' ? 'accept' : status === 'ERROR' ? 'error' : 'warning'}.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    background-color: ${({ status, theme }) => {
      if (status === 'SUCCESS') return theme.palette.green.dark
      if (status === 'WARNING') return theme.palette.warning.main
      if (status === 'ERROR') return theme.palette.danger.main
    }};
    width: 10px;
    height: 10px;

    @media screen and (min-width: 768px)  {
      width: 28px;
      height: 28px;
    }
  }
`

export const ViewerMore = styled.button`
  background-color: ${e => e.theme.palette.white.main};
  z-index: 1;
  align-self: center;
  margin-top: 10px;
  padding-top: 8px;
  padding-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
  color: ${e => e.theme.palette.primary.main};
  width: 100%;

  &:hover {
    opacity: 1;
    color: ${e => e.theme.palette.primary.light};
  }
`

export const ErrorBondaryContainer = styled.div`
  background-color: ${e => e.theme.palette.secondary.light};
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: ${e => e.theme.palette.secondary.dark};
    font-weight: 500;
  }
`
