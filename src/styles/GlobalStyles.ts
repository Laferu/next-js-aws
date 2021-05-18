import styled, { createGlobalStyle } from 'styled-components'
import PerfectScrollbar, { ScrollBarProps } from 'react-perfect-scrollbar'

interface IconProps {
  status: string
}

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  html {
    min-height: 100vh;
  }

  body {
    font-family: 'Roboto', sans-serif,
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  main {
    display: flex;
    flex: 1 0 auto;
    height: 100%;
    flex-direction: column;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  input {
    &:focus {
      outline: none;
    }
  }

  button, input[type='submit'] {
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;

    &::-moz-focus-inner {
        border: 0;
        padding: 0;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }

    &:focus {
      outline: none;
      font-weight: inherit;
    }

    &:active {
      font-weight: inherit;
    }
  }

  .mt-20 {
    && {
      margin-top: 20px !important;
    }
  }
  .mt-30 {
    && {
      margin-top: 30px !important;
    }
  }
  .mt-40 {
    && {
      margin-top: 40px !important;
    }
  }


  /* PERFECT SCROLLBAR */

&& {
/*
 * Container style
 */
.ps {
  overflow: hidden;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
}

/*
 * Scrollbar rail styles
 */
.ps__rail-x {
  display: none;
  opacity: 0;
  transition: background-color .2s linear, opacity .2s linear;
  -webkit-transition: background-color .2s linear, opacity .2s linear;
  height: 15px;
  /* there must be 'bottom' or 'top' for ps__rail-x */
  bottom: 0px;
  /* please don't change 'position' */
  position: absolute;
}

.ps__rail-y {
  display: none;
  opacity: 0;
  transition: background-color .2s linear, opacity .2s linear;
  -webkit-transition: background-color .2s linear, opacity .2s linear;
  width: 15px;
  /* there must be 'right' or 'left' for ps__rail-y */
  right: 0;
  /* please don't change 'position' */
  position: absolute;
}

.ps--active-x > .ps__rail-x,
.ps--active-y > .ps__rail-y {
  display: block;
  background-color: transparent;
}

.ps:hover > .ps__rail-x,
.ps:hover > .ps__rail-y,
.ps--focus > .ps__rail-x,
.ps--focus > .ps__rail-y,
.ps--scrolling-x > .ps__rail-x,
.ps--scrolling-y > .ps__rail-y {
  opacity: 0.6;
}

.ps .ps__rail-x:hover,
.ps .ps__rail-y:hover,
.ps .ps__rail-x:focus,
.ps .ps__rail-y:focus,
.ps .ps__rail-x.ps--clicking,
.ps .ps__rail-y.ps--clicking {
  background-color: #eee;
  opacity: 0.9;
}

/*
 * Scrollbar thumb styles
 */
.ps__thumb-x {
  background-color: #aaa;
  border-radius: 6px;
  transition: background-color .2s linear, height .2s ease-in-out;
  -webkit-transition: background-color .2s linear, height .2s ease-in-out;
  height: 6px;
  /* there must be 'bottom' for ps__thumb-x */
  bottom: 2px;
  /* please don't change 'position' */
  position: absolute;
}

.ps__thumb-y {
  background-color: #aaa;
  border-radius: 6px;
  transition: background-color .2s linear, width .2s ease-in-out;
  -webkit-transition: background-color .2s linear, width .2s ease-in-out;
  width: 6px;
  /* there must be 'right' for ps__thumb-y */
  right: 2px;
  /* please don't change 'position' */
  position: absolute;
}

.ps__rail-x:hover > .ps__thumb-x,
.ps__rail-x:focus > .ps__thumb-x,
.ps__rail-x.ps--clicking .ps__thumb-x {
  background-color: #999;
  height: 11px;
}

.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y.ps--clicking .ps__thumb-y {
  background-color: #999;
  width: 11px;
}

/* MS supports */
@supports (-ms-overflow-style: none) {
  .ps {
    overflow: auto;
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .ps {
    overflow: auto;
  }
}
.scrollbar-container {
  position: relative;
  height: 100%; }

/*# sourceMappingURL=styles.css.map*/

}

  /* CALENDAR */

  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: ${e => e.theme.palette.white.main};
    /* border: 1px solid #a0a096; */
    font-family: 'Roboto' sans-serif;
    font-weight: 500;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    /* color: #d10000; */
    color: ${e => e.theme.palette.danger.main};
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    /* background: #76baff; */
    background: ${e => e.theme.palette.primary.main};
    color: white;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: ${e => e.theme.palette.primary.main};
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${e => e.theme.palette.primary.dark};
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  height: calc(100vh - ${e => e.theme.headerHeight.desktop});
`

export const NoCustomScrollbar = styled.div`
  height: 100%;
  overflow: auto;
`

export const StyledMain = styled.main`
  padding: 20px 10px;
  position: relative;

  @media screen and (min-width: 768px) {
    padding: 40px;
    padding-left: calc(${e => e.theme.sidebarWidth.w768} + 40px);
    width: 100%;
    /* margin: 0 auto; */
  }
`

export const FitContainer = styled.div`
  padding: 0 15px;

  @media screen and (min-width: 768px) {
    padding: 0 30px;
  }
`

export const TabsContainer = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  max-width: ${e => e.width || '100%'};
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  header {
    display: flex;
    justify-content: space-evenly;
    column-gap: 10px;
    margin-bottom: -2px;
    /* width: 80px; */
    width: calc(100% - 30px);

    @media screen and (min-width: 768px) {
      column-gap: 30px;
    }
  }
`

export const Tab = styled.div<{ active?: boolean, disable?: boolean }>`
  background-color: ${e => e.disable ? e.theme.palette.secondary.light : e.active ? e.theme.palette.white.main : e.theme.palette.primary.main};
  color: ${e => e.disable ? e.theme.palette.secondary.main : e.active ? e.theme.palette.primary.main : e.theme.palette.white.main};
  font-size: 14px;
  text-align: center;
  height: 50px;
  width: 100%;
  /* max-width: 280px; */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0 0;
  padding: 0 10px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;

    &:link, &:visited {
      text-decoration: inherit;
      color: inherit;
    }

    &:hover {
      cursor: ${e => e.disable ? 'default' : 'pointer'};
      text-decoration: ${e => e.disable ? 'none' : 'underline'};
    }

    &:active {
      text-decoration: none;
    }
  }
`

export const TabsContent = styled.div`
  padding: 15px 15px;

  @media screen and (min-width: 768px) {
    padding: 40px 30px;
  }
`

export const ShadowBox = styled.div<{ width?: string }>`
  background-color: #FFF;
  position: relative;
  display: flex;
  flex: 1;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  width: 100%;
  /* height: 580px; */
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 10px;
  /* margin-top: 40px; */
  overflow: hidden;

  @media screen and (min-width: 768px) {
    padding: 20px;
  }

  @media screen and (min-width: 998px) {
    max-width: ${e => e.width || '100%'};
  }
`

export const Title = styled.h1`
  font-weight: 500;
  color: ${e => e.theme.palette.primary.main};
  line-clamp: 1;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  max-width: 500px;
  font-size: 20px;

  @media screen and (min-width: 768px) {
    font-size: 34px;
  }
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

    @media screen and (min-width: 768px) {
      width: 28px;
      height: 28px;
    }
  }
`

export const TableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

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
  color: ${e => e.theme.palette.secondary.dark};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  border-collapse: collapse;
  position: relative;
  table-layout: fixed;
  width: 100%;

  thead {
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  tbody {
    border-bottom: 4px solid ${e => e.theme.palette.borderGray};

    tr {
      border-bottom: 3px solid ${e => e.theme.palette.borderGray};
    }
  }

  tr {
    border-bottom: 1px solid ${e => e.theme.palette.borderGray};
    text-align: right;
    height: auto;
    display: block;
    margin-bottom: 10px;
  }

  th {
    font-weight: 500;
    position: sticky;
    background-color: white;
    top: 0;
    z-index: 1;
    text-align: left;
    line-clamp: 2;
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
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`

export const ResponsiveTable = styled(StyledTable)`
  && {
    thead {
      @media screen and (min-width: 768px) {
        height: auto;
        margin: 0;
        overflow: auto;
        position: static;
        width: auto;
      }
    }

    tbody {
      tr {
        @media screen and (min-width: 768px) {
          border: 0;
          border-top: 1px solid ${e => e.theme.palette.borderGray};
        }
      }
    }

    tr {
      @media screen and (min-width: 768px) {
        border: 0;
        display: table-row;
        text-align: left;
        height: 55px;
        display: table-row;
        margin-bottom: 0;
      }
    }

    th {
      @media screen and (min-width: 768px) {
        &:first-child {
          text-align: center;
        }
      }
    }

    td {
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
  }

`

export const TrLink = styled.tr`
  &:hover, &:active {
    td {
      background-color: ${e => e.theme.palette.secondary.light};
      cursor: pointer;
    }
  }
`

export const PaginateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 40px;

  .pagination {
    list-style: none;
    display: flex;
  }

  li {
    border: none;

    a {
      display: flex;
      justify-content: center;
      min-width: 20px;
      margin-left: 10px;
      color: ${e => e.theme.palette.primary.main};
      border: none;
      outline: none;

      &:hover, &:active {
        cursor: pointer;
        color: ${e => e.theme.palette.primary.dark};
        border: none;
      }
    }

    &.active {
      a {
        color: ${e => e.theme.palette.primary.dark};

        &:hover, &:active {
          cursor: pointer;
          color: ${e => e.theme.palette.primary.dark};
          border: none;
          opacity: .6;
        }
      }
    }
  }
`

export const VerticalTable = styled(StyledTable)<{ titleBlue?: boolean }>`
  && {
    tbody {
      border: none;
      width: 100%;

      tr {
        border: none;

        td {
          font-size: 14px;
          height: 55px;
          text-align: left;

          &:before {
            ${e => e.titleBlue && (
              'color: ' + e.theme.palette.primary.main
            )};
            font-size: 14px;
          }
        }
      }
    }
  }
`
