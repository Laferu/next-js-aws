import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;

  @media screen and (min-width: 768px) {
    padding-bottom: 60px;
  }
`

export const StyledLabel = styled.label`
  font-size: 12px;
  color: ${e => e.theme.palette.secondary.dark};
  padding-bottom: 5px;
  display: block;
  text-indent: 5px;

  @media screen and (min-width: 768px) {
    padding-bottom: 20px;
    text-indent: 12px;
    font-size: 14px;
  }
`

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`

export const StyledInput = styled.input`
  background-position: calc(100% - 35px) 50% !important;
  width: 100%;
  height: 20px;
  border: none;
  border-bottom: 1px solid ${e => e.theme.palette.primary.main};
  text-indent: 8px;
  font-size: 16px;
  font-weight: bold;
  padding: 0;

  &:focus {
    outline: none;
  }

  @media screen and (min-width: 768px) {
    text-indent: 18px;
    height: 30px;
  }
`

export const InputIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 15px;

  &:hover, &:active {
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    height: 25px;
  }
`

export const ForgetPasswordText = styled.a`
  align-self: flex-end;
  color: ${e => e.theme.palette.primary.main};
  font-size: 12px;
  text-decoration: none;
  margin-top: 14px;
  margin-right: 10px;

  @media screen and (min-width: 768px) {
    margin-right: 30px;
    font-size: 16px;
    margin-top: 28px;
  }

  &:hover {
    text-decoration: underline;
    opacity: 0.6;
  }

  &:active {
    text-decoration: underline;
    opacity: 0.6;
  }
`
