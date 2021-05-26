import React, {
  useCallback,
  useState,
  forwardRef,
  ForwardRefRenderFunction
} from 'react'
import Link from 'next/link'
import { useContext } from 'react'

import { GlobalContext } from '@/utils/Context'
import {
  InputContainer,
  StyledInput,
  InputIcon,
  StyledLabel,
  Container,
  ForgetPasswordText
} from "@/styles/components/loginComponents/InputLabel"

interface InputLabelProps {
  label: string
  type: string,
  required?: boolean
  bottomText?: string
  bottomTextLink?: string
}

const InputLabel: ForwardRefRenderFunction<HTMLInputElement, InputLabelProps> = ({
  type,
  label,
  bottomText,
  bottomTextLink,
  ...rest
}, ref) => {
  const { url } = useContext(GlobalContext)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleShowPassword = useCallback(() => {
    if (type !== 'password') {
      return
    }

    setShowPassword(e => !e)
  }, [])

  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <InputContainer>
        <StyledInput
          type={type !== 'password' ? type : showPassword ? 'text' : type}
          ref={ref}
          {...rest}
          // data-lpignore="true"
        />
        <InputIcon
          src={`/assets/${type === 'password' ? 'disable-eye-icon.png' : 'user-icon.png'}`}
          onClick={handleShowPassword}
        />
      </InputContainer>
      {bottomTextLink && (
        <Link href={bottomTextLink} passHref>
          {bottomText && (
            <ForgetPasswordText title={bottomText}>
              {bottomText}
            </ForgetPasswordText>
          )}

        </Link>
      )}
    </Container>
  )
}

export default forwardRef(InputLabel)
