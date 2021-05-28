import { useRef, useCallback, FormEvent, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NewLoginSession } from '@swp/swipe-sdk'
import { useCookies } from "react-cookie"

import { usePost } from '@/hooks/useRest'
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
  setMessageError: React.Dispatch<React.SetStateAction<string>>
}

const FormLogin = ({ setIsModal, setMessageError }: FormLoginProps) => {
  const [, setCookie] = useCookies(['@Swipe:userAuthInfo'])
  const { state } = useContext(GlobalContext)
  const post = usePost('login')
  const router = useRouter()
  const formValues = useRef<IFormValues | any>({})

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    const login: NewLoginSession = {
      login: formValues.current.email.value,
      password: formValues.current.password.value,
      expirationInDays: 1
    }

    try {
      state.setIsLoading(true)
      const { data: result } = await post.post(login)

      if (result.code === "BAD_REQUEST_BODY") {
        state.setIsLoading(false)
        setMessageError('Credenciais inválidas.')
        setIsModal(true)
        console.log(result)

        return
      }
      console.log(result)
      const data = {
        // accountId: result.data.accountId,
        isLogged: result.data.isLogged,
        // login: result.data.login,
        sessionId: result.data.sessionId
      }

      setCookie('@Swipe:userAuthInfo', JSON.stringify(data), {
        path: "/",
        maxAge: 86400, // Expires after 1d
        sameSite: true,
      })

      state.setIsLoading(false)

      router.push('/')
    } catch (error) {
      state.setIsLoading(false)
      setMessageError('Aconteceu um erro inesperado.')
      setIsModal(true)
      console.log(error)

      return
    }
  }, [formValues.current])

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <FormTitle>Bem Vindo!</FormTitle>
          <FormDescription>
            Digite seu e-mail e senha nos campos abaixo
          </FormDescription>
        </div>
        <InputsContainer>
          <InputLabel
            type='email'
            label='Digite seu e-mail'
            ref={e => formValues.current['email'] = e}
            required
          />
          <InputLabel
            type='password'
            label='Digite sua senha'
            ref={e => formValues.current['password'] = e}
            required
            bottomText='Esqueceu sua senha?'
            bottomTextLink='/forget'
          />
        </InputsContainer>
        <ButtonContainer>
          <StyledButton />
        </ButtonContainer>
      </StyledForm>
      <Link href='/help' passHref>
        <NeedHelpText>Precisa de ajuda?</NeedHelpText>
      </Link>
    </Container>
  )
}

export default FormLogin
