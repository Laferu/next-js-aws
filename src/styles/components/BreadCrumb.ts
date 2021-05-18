import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 5px;
  /* padding-left: 28px; */
  padding-right: 40px;
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 1;

  ul {
    list-style: none;
    display: flex;
    overflow:hidden;

    li {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${e => e.theme.palette.secondary.dark};
      &:after {
        content: '/';
        font-size: 10px;
        padding: 0 3px;
      }
      &:last-child {
        &:after {
          content: '';
        }
      }

      a {
        font-size: 10px;
        font-weight: 500;

        &:link, &:visited {
          color: ${e => e.theme.palette.secondary.dark};
          text-decoration: none;
        }

        &:hover, &:active {
          color: ${e => e.theme.palette.secondary.main};
          text-decoration: underline;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    padding-top: 10px;
    /* padding-left: 60px; */
    padding-right: 80px;
    left: calc(${e => e.theme.sidebarWidth.w768} + 40px);

    li {
      max-width: 200px;
    }
  }
`
