import { useRef, useCallback, FormEvent, useContext } from 'react'
import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { NewLoginSession } from '@swp/swipe-sdk'
// import { useCookies } from "react-cookie"

// import { usePost } from '@/hooks/useRest'
import { GlobalContext } from '@/utils/Context'

import {
  Container,
  FormDescription,
  FormTitle,
  StyledForm,
  InputsContainer,
  StyledButton,
  ButtonContainer,
  NeedHelpText
} from '@/styles/components/loginComponents/FormLogin'
import InputLabel from './InputLabel'

interface IFormValues {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface FormLoginProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const FormResetSendEmail = ({
  setIsModal,
  setTitle,
  setMessage
}: FormLoginProps) => {
  const { state } = useContext(GlobalContext)
  // const post = usePost('login')
  // const router = useRouter()
  const formValues = useRef<IFormValues | any>({})

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    try {
      state.setIsLoading(true)

      setTitle('Seu e-mail já foi enviado!')
      setMessage('Caso não encontre na sua caixa de entrada, verique na sua caixa de spam.')
      setIsModal(true)

      state.setIsLoading(false)

      // router.push('/')
    } catch (error) {
      state.setIsLoading(false)
      // setTitle('Error!')
      setMessage('Aconteceu um erro inesperado.')
      setIsModal(true)
      console.log(error)

      return
    }
  }, [formValues.current])

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <FormDescription>
          Redefinição de senha
        </FormDescription>
        <InputsContainer>
          <InputLabel
            type='email'
            label='E-mail que será enviado o link de redefinição'
            ref={e => formValues.current['email'] = e}
            required
            bottomText='Não tenho acesso a este e-mail'
            bottomTextLink='/forget/email'
          />
        </InputsContainer>
        <ButtonContainer>
          <StyledButton
            value='Enviar e-mail'
          />
        </ButtonContainer>
      </StyledForm>
      <Link href='/help' passHref>
        <NeedHelpText>Precisa de ajuda?</NeedHelpText>
      </Link>
    </Container>
  )
}

export default FormResetSendEmail
