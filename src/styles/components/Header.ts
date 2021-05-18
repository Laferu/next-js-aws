import styled from 'styled-components'

export const StyledHeader = styled.header`
  background: ${e => e.theme.palette.white.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 115px 1fr 40px;
  justify-content: space-between;
  width: 100%;
  height: ${e => e.theme.headerHeight.mobile};
  z-index: 2;

  @media screen and (min-width: 480px) {
    grid-template-columns: 115px 1fr 60px;
    height: ${e => e.theme.headerHeight.desktop};
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 200px 1fr 1fr;
  }
`

export const HamburgerMenu = styled.div<{ isOpen: boolean }>`
  position: relative;
  align-self: center;

  .menu {
    width: 30px;
    /* height: 60px; */
    position: absolute;
    /* bottom: 25px; */
    /* right: 25px; */
    cursor: pointer;
  }

  .hamburguer {
    opacity: .6;
    position: relative;
    display: block;
    background: #000;
    width: 30px;
    height: 2px;
    /* top: 29px; */
    /* left: 15px; */
    transition: 0.5s ease-in-out;
    transform: rotate(${e => e.isOpen ? 45 : 0}deg);

    &:before,
    &:after {
      background: #000;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      transition: 0.5s ease-in-out;
    }

    &:before {
      transform: rotate(${e => e.isOpen ? 90 : 0}deg);
      top: ${e => e.isOpen ? 0 : -10}px;
    }

    &:after {
      transform: rotate(${e => e.isOpen ? 90 : 0}deg);
      bottom: ${e => e.isOpen ? 0 : -10}px;
    }
  }

  @media screen and (min-width: 768px) {
    display: none
  }
`

export const Logo = styled.img`
  height: 70px;
  align-self: center;

  @media screen and (min-width: 480px) {
    height: 90px;
  }
`

export const UserInfo = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-bottom: 30px;
  /* Na próxima versão */
  /* margin-bottom: 10px; */
  color: ${e => e.theme.palette.secondary.dark};
  font-weight: bold;

  h2 {
    font-size: 20px;
    white-space: nowrap;
    span {
      color: ${e => e.theme.palette.primary.main};
    }

    @media screen and (min-width: 480px) {
      font-size: 24px;
    }
  }

  h3 {
    font-size: 16px;
    display: none;
    /* Na próxima versão */
    /* display: block; */
  }
`

export const HeaderRight = styled.div`
  display: none;

  @media screen and (min-width: 1000px) {
    display: none;
    /* Na próxima versão */
    /* display: flex; */
  }
`

export const SearchAndNotificationContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
  column-gap: 30px;
`

export const Search = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  width: 320px;

  input {
    /* background-position: calc(100% - 35px) 50% !important; */
    width: 100%;
    height: 100%;
    border: 1px solid ${e => e.theme.palette.primary.main};
    box-sizing: border-box;
    border-radius: 20px;
    text-indent: 40px;
    color: ${e => e.theme.palette.secondary.dark};

    &::placeholder {
      color: ${e => e.theme.palette.secondary.main};
    }
  }
`

export const InputIcon = styled.div`
  position: absolute;
  /* bottom: 5px; */
  left: 20px;
  height: 15px;
  mask: url('/assets/icons/search.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.secondary.main};
  width: 15px;
  height: 15px;
/*
  &:hover, &:active {
    cursor: pointer;
  } */
`

export const NotificationIcon = styled.div`
  mask: url('/assets/icons/bell.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.primary.main};
  width: 33px;
  height: 33px;
`

export const AvatarContainer = styled.div`
  width: 116px;
  height: 90px;
  position: relative;
  display: flex;
  align-items: center;
  align-self: center;
  margin-left: 30px;

  &:after {
    content: '\\25bc';
    font-size: 20px;
    color: ${e => e.theme.palette.primary.main};
    width: 30px;
    position: absolute;
    right: 5px;
  }

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
  }
`
