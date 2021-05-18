import styled from 'styled-components'

interface NavItemProps {
  icon: string
  active?: boolean
}

export const Container = styled.nav<{ isOpen: boolean }>`
  overflow: hidden;
  background: ${e => e.theme.palette.primary.main};
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${e => e.isOpen ? e.theme.sidebarWidth.w768Animated : 0};
  height: calc(100vh - ${e => e.theme.headerHeight.mobile});
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  transition: .4s width linear;
  z-index: 1;

  &:hover {
    width: ${e => e.theme.sidebarWidth.w768Animated};
  }

  @media screen and (min-width: 768px) {
    height: calc(100vh - ${e => e.theme.headerHeight.desktop});
    width: ${e => e.theme.sidebarWidth.w768};
  }
`

export const NavItem = styled.li<NavItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  position: relative;
  height: 70px;
  margin-top: 30px;
  background-color: ${({ active, theme }) => active ? theme.palette.white.main : theme.palette.primary.main};
  box-shadow: ${e => e.active ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};

  &:first-child {
    margin-top: 70px;
  }

  &:last-child {
    margin-bottom: 30px;
  }

  &:before {
    content: '';
    mask: url('/assets/icons/${e => e.icon}.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    background-color: ${({ active, theme }) => active ? theme.palette.primary.main : theme.palette.white.main};
    width: 35px;
    height: 35px;
    position: absolute;
    left: 40px;
  }

  &:hover {
    background: ${e => e.theme.palette.white.main};
    color: ${e => e.theme.palette.primary.main};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    opacity: ${e => e.active ? .9 : 1};

    &&:before {
      background-color: ${e => e.theme.palette.primary.main};
    }
  }

  a, button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 110px;
    font-size: 18px;
    font-weight: 500 !important;
    text-align: left;
    z-index: 1;
    color: ${({ active, theme }) => active ? theme.palette.primary.main : theme.palette.white.main};
    cursor: pointer;

    &:link, &:visited {
      color: ${({ active, theme }) => active ? theme.palette.primary.main : theme.palette.white.main};
      text-decoration: none;
    }

    &:hover, &:active {
      color: ${e => e.theme.palette.primary.main};
      transform: none;
      opacity: 1;
    }
  }
`
