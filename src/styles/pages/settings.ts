import styled from 'styled-components'

interface InputContainterProps {
  width?: string
  textAlign?: string
  alignSelf?: string
  iconOutside?: boolean
}

interface InputTextButtonProps {
  variantGray?: boolean,
  isVisible?: boolean
}

export const Description = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${e => e.theme.palette.secondary.dark};
  margin-top: 20px;
`

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  margin-top: 60px;
`

export const EditPassButton = styled.input.attrs({
  type: 'submit',
  value: 'Alterar senha'
})`
  && {
    background-color: ${e => e.theme.palette.primary.main};
    width: 260px;
    height: 40px;
    align-self: center;
    border-radius: 10px;
    color: ${e => e.theme.palette.white.main};
    font-size: 14px;
    font-weight: 500;
  }
`

export const SendInviteButton = styled.input.attrs({
  type: 'submit',
  value: 'Enviar convite'
})`
  && {
    background-color: ${e => e.theme.palette.primary.main};
    width: 130px;
    height: 40px;
    margin-left: 0;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    text-align: center;
    color: ${e => e.theme.palette.white.main};
    font-size: 14px;
    font-weight: 500;
    padding: 0;

    @media screen and (min-width: 768px) {
      height: 50px;
      margin-left: 20px;
      align-self: flex-start;
      width: 150px;
    }
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  row-gap: 30px;
  width: 100%;

  h5 {
    font-size: 14px;
    font-weight: 500;
    color: ${e => e.theme.palette.primary.main};
    margin-bottom: -20px;
  }
`

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  column-gap: 20px;
  row-gap: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`

export const InputContainer = styled.div<InputContainterProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${e => e.width ? e.width : '400px'};
  width: ${e => e.iconOutside ? 'calc(100% - 30px)' : '100%'};
  margin-top: auto;
  align-self: ${e => e.alignSelf || 'flex-start'};

  label {
    font-size: 14px;
    font-weight: 500;
    color: ${e => e.theme.palette.secondary.dark};
    margin-bottom: 8px;
  }

  input {
    display: flex;
    position: relative;
    height: 40px;
    border: 2px solid ${e => e.theme.palette.primary.light}42;
    border-radius: 10px;
    width: 100%;
    text-align: ${e => e.textAlign ? e.textAlign : 'left'};
    font-size: 14px;
    color: ${e => e.theme.palette.secondary.dark};
    padding-left: 10px;
    padding-right: 30px;
    background-position: calc(100% - 45px) 50% !important;
    font-weight: 500;

    &::placeholder {
      color: ${e => e.theme.palette.secondary.main};
      font-weight: 500;
    }

    @media screen and (min-width: 768px) {
      height: 50px;
      padding-left: 20px;
      padding-right: 40px;
      width: 100%;
    }
  }
`

export const InputIcon = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 20px;
  height: 20px;
  mask: url('/assets/icons/disable-eye.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.secondary.main};

  &:hover {
    cursor: pointer;
    opacity: .6;
  }

  @media screen and (min-width: 768px) {
    width: 28px;
    height: 28px;
  }
`

export const InputIconOutside = styled.div`
  position: absolute;
  right: -40px;
  bottom: 10px;
  width: 20px;
  height: 20px;
  mask: url('/assets/icons/lapis.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${e => e.theme.palette.primary.main};

  &:hover {
    cursor: pointer;
    opacity: .6;
  }

  @media screen and (min-width: 768px) {
    width: 28px;
    height: 28px;
  }
`

export const InputTextButton = styled.div<InputTextButtonProps>`
  display: ${e => e.isVisible ? 'block' : 'none'};
  position: absolute;
  right: 10px;
  bottom: 2px;
  height: 34px;
  background-color: ${e => e.variantGray ? '#FAFAFA' : e.theme.palette.white.main};
  padding-left: 5px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${e => e.variantGray ? e.theme.palette.secondary.dark : e.theme.palette.primary.main};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;

    &:link, &:visited {
      color: inherit;
      text-decoration: inherit;
    }

    &:hover {
      cursor: pointer;
      opacity: 6;
    }

    &:active {
      opacity: 1;
    }
  }

  @media screen and (min-width: 768px) {
    /* width: 28px; */
    height: 44px;
    right: 20px;
    bottom: 4px;
  }
`

export const DropdownTextButton = styled.ul<{ isOpen?: boolean }>`
  display: ${e => e.isOpen ? 'block' : 'none'};
  position: absolute;
  z-index: 1;
  right: -20px;
  margin-top: 14px;
  min-width: 180px;
  padding-bottom: 20px;
  background-color: ${e => e.theme.palette.white.main};
  list-style: none;
  box-shadow: 0px 5px 20px rgba(101, 101, 101, 0.15);
  border-radius: 16px;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid ${e => e.theme.palette.secondary.light};
    height: 50px;
    font-size: 14px;
    font-weight: 500;
    color: ${e => e.theme.palette.secondary.dark};

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: inherit;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;

      &:link, &:visited {
        color: inherit;
        text-decoration: inherit;
      }

      &:hover, &:active {
        cursor: pointer;
        opacity: .6;
      }
    }
  }
`
