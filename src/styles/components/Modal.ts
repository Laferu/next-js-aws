import styled from 'styled-components'

export const Mask = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${e => e.theme.palette.white.main};
  box-shadow: 0px 5px 30px rgba(101, 101, 101, 0.15);
  border-radius: 16px;
  width: 100%;
  max-width: 300px;
  min-height: 180px;
  margin: 10px;
  padding: 70px 20px 20px 20px;

  @media screen and (min-width: 768px) {
    max-width: 400px;
    min-height: 230px;
    margin: 10px;
    padding: 80px 20px 20px 20px;
  }
`

export const Message = styled.p<{ variantColor?: [string, string] }>`
  font-size: 18px;
  font-weight: 500;
  color: ${e => e.variantColor ? e.theme.palette[e.variantColor[0]][e.variantColor[1]] : e => e.theme.palette.secondary.dark};
  text-align: center;
  width: 100%;

  @media screen and (min-width: 768px) {
    font-size: 22px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`

export const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${e => e.theme.palette.primary.main};
  border-radius: 10px;
  width: 80px;
  height: 30px;
  margin-top: auto;
  margin-right: 30px;
  font-size: 12px;
  color: ${e => e.theme.palette.white.main};

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 50px;
    font-size: 16px;
  }
`

export const ConfirmButton = styled.button<{ backgroundColor?: [string, string], textColor?: [string, string] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${e => e.backgroundColor ? e.theme.palette[e.backgroundColor[0]][e.backgroundColor[1]] : e.theme.palette.white.main};
  border: 2px solid ${e => e.theme.palette.secondary.light};
  border-radius: 10px;
  width: 80px;
  height: 30px;
  font-size: 12px;
  color: ${e => e.textColor ? e.theme.palette[e.textColor[0]][e.textColor[1]] : e.theme.palette.secondary.dark};

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 50px;
    font-size: 16px;
  }
`

export const OkButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${e => e.theme.palette.primary.main};
  border-radius: 10px;
  width: 80px;
  height: 30px;
  align-self: flex-end;
  font-size: 12px;
  color: ${e => e.theme.palette.white.main};

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 50px;
    font-size: 16px;
  }
`

export const CancelXButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: ${e => e.theme.palette.secondary.dark};
  padding: 10px;
  cursor: pointer;

  &:before {
    content: 'x'
  }

  &:hover {
    opacity: 0.6;
  }

  /* &:active {
    font-size: 20px;
  } */

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`
