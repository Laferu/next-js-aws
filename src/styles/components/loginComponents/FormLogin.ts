import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;

  @media screen and (min-width: 1280px) {
    background: url('/assets/swipe-prancheta.png') no-repeat center right;
    background-size: 320px;
  }
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: calc(100% - 20px);
  min-width: 220px;
  max-width: 692px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 10px 20px 10px;

  @media screen and (min-width: 768px) {
    padding: 40px 40px 40px 40px;
  }
`

export const FormTitle = styled.h1`
  text-align: center;
  color: ${e => e.theme.palette.primary.main};
  font-weight: bold;
  font-size: 22px;
  padding-bottom: 20px;

  @media screen and (min-width: 768px) {
    font-size: 64px;
    padding-bottom: 40px;
  }
`

export const FormDescription = styled.h2`
  text-align: center;
  color: ${e => e.theme.palette.primary.main};
  font-weight: bold;
  font-size: 16px;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`

export const FormDescriptionMini = styled.p`
  text-align: center;
  color: ${e => e.theme.palette.secondary.dark};
  font-weight: normal;
  font-size: 16px;
  padding: 20px 10px 0 10px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    padding-top: 50px;
  }
`

export const InputsContainer = styled.div`
  padding: 20px 10px 0 10px;

  @media screen and (min-width: 768px) {
    padding-top: 60px;
  }
`

export const ButtonContainer = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: center;
`

export const StyledButton = styled.input.attrs(e => ({
  type: 'submit',
  value: e.value ?? 'Entrar'
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 200px;
  border-radius: 10px;
  font-size: 12px;

  && {
    background-color: ${e => e.theme.palette.primary.main};
    color: ${e => e.theme.palette.white.main};
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (min-width: 768px) {
    height: 60px;
    width: 400px;
    font-size: 16px;
  }
`

export const NeedHelpText = styled.a`
  font-size: 12px;
  color: ${e => e.theme.palette.primary.main};
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
    opacity: 0.6;
  }

  &:active {
    text-decoration: underline;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
