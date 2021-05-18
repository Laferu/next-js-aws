import { useRef, useCallback, FormEvent, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { NewLoginSession } from '@swp/swipe-sdk'
// import { useCookies } from "react-cookie"

// import { usePost } from '@/hooks/useRest'
import { GlobalContext } from '@/utils/Context'
import { validatePassword } from '@/utils/validations'

import {
  Container,
  FormDescription,
  FormDescriptionMini,
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
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setFunc: React.Dispatch<React.SetStateAction<{ run: Function }>>
}

const FormNewPassword = ({ setIsModal, setMessage, setFunc }: FormLoginProps) => {
  // const [, setCookie] = useCookies(['@Swipe:userAuthInfo'])
  const { state } = useContext(GlobalContext)
  // const post = usePost('login')
  const router = useRouter()
  const formValues = useRef<IFormValues | any>({})

  const redirectLogin = useCallback(() => {
    console.log('aaaaaa')
    router.push('/login')
  }, [])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    // const login: NewLoginSession = {
    //   login: formValues.current.email.value,
    //   password: formValues.current.password.value,
    //   expirationInDays: 1
    // }

    try {
      if (formValues.current.password.value !== formValues.current.password2.value) {
        setFunc(() => ({
          run: () => {}
        }))
        setMessage('Os dois campos de senha devem ser equivalentes')
        setIsModal(true)
        return
      }
      if (!validatePassword(formValues.current.password.value)) {
        setFunc(() => ({
          run: () => {}
        }))
        setMessage('Sua senha deve ter mais de 9 dígitos e pelo menos uma letra maiúscula.')
        setIsModal(true)
        return
      }
      if (!validatePassword(formValues.current.password2.value)) {
        setFunc(() => ({
          run: () => {}
        }))
        setMessage('Sua senha deve ter mais de 9 dígitos e pelo menos uma letra maiúscula.')
        setIsModal(true)
        return
      }
      state.setIsLoading(true)
      // const { data: result } = await post.post(login)

      // if (result.code === "BAD_REQUEST_BODY") {
      //   state.setIsLoading(false)
      setFunc(() => ({
        run: redirectLogin
      }))
        setMessage('Senha alterada com sucesso!')
        setIsModal(true)
      //   console.log(result)

      //   return
      // }

      // const data = {
      //   // accountId: result.data.accountId,
      //   isLogged: result.data.isLogged,
      //   // login: result.data.login,
      //   sessionId: result.data.sessionId
      // }

      // setCookie('@Swipe:userAuthInfo', JSON.stringify(data), {
      //   path: "/",
      //   maxAge: 86400, // Expires after 1d
      //   sameSite: true,
      // })

      state.setIsLoading(false)
    } catch (error) {
      state.setIsLoading(false)
      setFunc(() => ({
        run: () => {}
      }))
      setMessage('Aconteceu um erro inesperado.')
      setIsModal(true)
      console.log(error)

      return
    }
  }, [formValues.current, redirectLogin])

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <FormDescription>
            Redefinir senha
          </FormDescription>
          <FormDescriptionMini>
            Sua senha deve ter no mínimo 9 dígitos,
            onde pelo menos uma letra deverá ser maiúscula.
          </FormDescriptionMini>
          <InputsContainer>
            <InputLabel
              type='password'
              label='Digite sua nova senha'
              ref={e => formValues.current['password'] = e}
              required
            />
            <InputLabel
              type='password'
              label='Confirme sua nova senha'
              ref={e => formValues.current['password2'] = e}
              required
            />
          </InputsContainer>
        </div>

        <ButtonContainer>
        <StyledButton
            value='Redefinir senha'
          />
        </ButtonContainer>
      </StyledForm>
      <Link href='/help' passHref>
        <NeedHelpText>Precisa de ajuda?</NeedHelpText>
      </Link>
    </Container>
  )
}

export default FormNewPassword
