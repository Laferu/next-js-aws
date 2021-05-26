import {
  useRef,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
  ChangeEventHandler
} from 'react'
import { settingsServerSideProps } from '@/serverSideFunctions/pages/settings'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ConfirmModal from "@/components/ConfirmModal"
import Header from "@/components/Header"
import PerfectScrollbar from "@/components/PerfectScrollbar"
import SEO from "@/components/SEO"
import Sidebar from "@/components/Sidebar"
import BreadCrumb from '@/components/BreadCrumb'
import {
  // FitContainer,
  ShadowBox,
  StyledMain,
  Tab,
  TabsContainer,
  TabsContent,
  Title,
  Wrapper
} from "@/styles/GlobalStyles"
import {
  StyledHeader,
  TitleContainer,
  Description,
  EditPassButton,
  SendInviteButton,
  FormRow,
  InputContainer,
  InputIcon,
  StyledForm,
  InputTextButton,
  InputIconOutside,
  FormGroup,
  DropdownTextButton
} from '@/styles/pages/settings'
import { GlobalContext } from '@/utils/Context'
import { validatePassword } from '@/utils/validations'
import { usePost } from '@/hooks/useRest'

const AlertModal = dynamic(
  () => import ('@/components/AlertModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

interface IFormValues {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface ITeam {
  email: string
  permission: string
  editTempPermission: string
}

interface IPasswordTypes {
  'old-password': boolean
  'new-password': boolean
  'confirm-password': boolean
}

interface IPages {
  name: string
  url: string
}

const Settings = ({ profile }) => {
  const { url, state: { setIsLoading } } = useContext(GlobalContext)
  const formValues = useRef<IFormValues | any>({})

  const post = usePost('verify-pass')
  const router = useRouter()
  const { slug } = router.query

  const [isOpenPermissions, setOpenPermissions] = useState<boolean[]>([])
  const [inviteEmail, setInviteEmail] = useState<string>('')
  const [invitePermission, setInvitePermission] = useState<string>('Permissão')
  const [isModal, setIsModal] = useState<boolean>(false)
  const [tabActive, setTabActive] = useState<string>('edit-password')
  const [message, setMessage] = useState<string>('')
  const [togglePass, setTogglePass] = useState<IPasswordTypes>({
    'old-password': false,
    'new-password': false,
    'confirm-password': false
  })
  const [team, setTeam] = useState<ITeam[]>([
    {
      email: 'mario.oliv@gmail.com',
      permission: 'Administrador',
      editTempPermission:  'Administrador'
    },
    {
      email: 'luana.apa@gmail.com',
      permission: 'Visualização',
      editTempPermission:  'Visualização'
    }
  ])

  const [pages, setPages] = useState<IPages[]>([])

  const permissionsList = [
    'Administrador',
    'Visualização'
  ]

  const onChangeInviteEmail = useCallback((evt) => {
    setInviteEmail(evt['target'].value)
  }, [])

  // const onFocusInvite = useCallback(() => {
  //   setPermissionVisible(true)
  // }, [])

  // const onBlurInvite = useCallback(() => {
  //   setPermissionVisible(false)
  // }, [])

  const close = useCallback(() => {
    setIsModal(false)
  }, [])

  const openPermissions = useCallback((
    e: FormEvent,
    index: number
  ) => {
    e.preventDefault()
    setOpenPermissions(e => {
      const newData = [...e]
      newData[index] = !newData[index]

      return [...newData]
    })
  }, [])

  const changePermission = useCallback((
    evt: FormEvent,
    index: number,
    permissionIndex: number
  ) => {
    evt.preventDefault()

    setOpenPermissions(e => {
      const newData = [...e]
      newData[index] = !newData[index]

      return [...newData]
    })

    if (index === 0) {
      setInvitePermission(permissionsList[permissionIndex])

      return
    }

    setTeam(e => {
      const newData = [...e]
      newData[index - 1].editTempPermission = permissionsList[permissionIndex]

      return [...newData]
    })
  }, [])

  const handleTogglePass = useCallback((evt: string) => {
    setTogglePass(e => {
      return {
        ...e,
        [evt]: !e[evt]
      }
    })
  }, [])

  const handleSubmitPermission = useCallback((index) => {
    setTeam(e => {
      const newData = [...e]
      newData[index].permission = newData[index].editTempPermission

      return [...newData]
    })
  }, [])

  const handleSubmitInvite = useCallback((e: FormEvent) => {
    e.preventDefault()

    if (invitePermission === 'Permissão') {
      setMessage('Selecione o tipo de permissão.')
      setIsModal(true)

      return
    }

    setIsLoading(true)
    setMessage('Convite enviado com sucesso!')
    setIsModal(true)
    setIsLoading(false)
    setInviteEmail('')
    setInvitePermission('Permissão')
  }, [invitePermission])

  const handleSubmitPass = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      if (formValues.current['new-password'].value !== formValues.current['confirm-password'].value) {
        setMessage('Os dois campos de senha devem ser equivalentes')
        setIsModal(true)
        setIsLoading(false)
        return
      }
      if (!validatePassword(formValues.current['new-password'].value)) {
        setMessage('Sua senha deve ter mais de 9 dígitos e pelo menos uma letra maiúscula.')
        setIsModal(true)
        setIsLoading(false)
        return
      }
      if (!validatePassword(formValues.current['confirm-password'].value)) {
        setMessage('Sua senha deve ter mais de 9 dígitos e pelo menos uma letra maiúscula.')
        setIsModal(true)
        setIsLoading(false)
        return
      }

      const { data: result } = await post.post({ password: formValues.current['old-password'].value })

      if (result.code === "BAD_REQUEST_BODY") {
        console.log(result)
        setMessage('A senha atual não confere')
        setIsModal(true)
        setIsLoading(false)
        return
      }

      setMessage('Sua senha foi redefinida com sucesso!')
      setIsModal(true)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setMessage('Aconteceu um erro inesperado.')
      setIsModal(true)
      console.log(error)

      return
    }
  }, [formValues.current])

  useEffect(() => {
    setTabActive(slug.toString())

    setPages([
      {
        name: 'Configurações',
        url: `${url.baseUrl}/settings`
      },
      {
        name: slug.toString() === 'invite-team'
          ? 'Times' : 'Alterar senha',
        url: `${url.baseUrl}/${slug.toString()}`
      }
    ])
  }, [])

  const EditPassword = (
    <>
      <Title>Para alterar a senha...</Title>
      <Description>
        Você deve colocar uma senha de no mínimo 9 dígitos,
        onde pelo menos uma letra deverá ser maiúscula.
      </Description>
      <StyledForm onSubmit={handleSubmitPass}>
        <FormRow>
          <InputContainer textAlign='center'>
            <label>Informe a senha atual</label>
            <input
              type={togglePass['old-password'] ? 'text' : 'password'}
              data-lpignore={true}
              ref={e => formValues.current['old-password'] = e}
              required
            />
            <InputIcon
              onClick={() => handleTogglePass('old-password')}
            />
          </InputContainer>
        </FormRow>
        <FormRow>
          <InputContainer textAlign='center'>
            <label>Informe a senha atual</label>
            <input
              type={togglePass['new-password'] ? 'text' : 'password'}
              data-lpignore={true}
              ref={e => formValues.current['new-password'] = e}
              required
            />
            <InputIcon
              onClick={() => handleTogglePass('new-password')}
            />
          </InputContainer>
          <InputContainer textAlign='center'>
            <label>Informe a senha atual</label>
            <input
              type={togglePass['confirm-password'] ? 'text' : 'password'}
              data-lpignore={true}
              ref={e => formValues.current['confirm-password'] = e}
              required
            />
            <InputIcon
              onClick={() => handleTogglePass('confirm-password')}
            />
          </InputContainer>
        </FormRow>
        <EditPassButton />
      </StyledForm>
    </>
  )

  const InviteTeam = (
    <>
      <Title>Convide pessoas da sua equipe</Title>
      <Description>
        Envie o convite para a criação do login dos integrantes da sua equipe.
      </Description>
      <StyledForm onSubmit={handleSubmitInvite}>
        <FormRow>
          <InputContainer width='560px' textAlign='center'>
            <label>Informe o e-mail do convidado</label>
            <input
              type='email'
              data-lpignore={true}
              ref={e => formValues.current['email'] = e}
              placeholder='E-mail'
              onChange={onChangeInviteEmail}
              value={inviteEmail}
              // onFocus={onFocusInvite}
              // onBlur={onBlurInvite}
              required
            />
            <InputTextButton
              isVisible={inviteEmail.length > 0}
            >
              <a onClick={(evt) => openPermissions(evt, 0)}>
                {invitePermission}
              </a>
              <DropdownTextButton
                isOpen={isOpenPermissions[0]}
              >
                {permissionsList.map((e, indexPermission) => (
                  <li key={indexPermission}>
                    <a onClick={(evt) => changePermission(evt, 0, indexPermission)}>
                      {e}
                    </a>
                  </li>
                ))}
              </DropdownTextButton>
            </InputTextButton>
          </InputContainer>
          <InputContainer width='150px' alignSelf='flex-end'>
            <SendInviteButton />
          </InputContainer>
        </FormRow>
      </StyledForm>
      <FormGroup>
        <h5>Integrantes do time</h5>
        {team.map((e, index) => (
          <FormRow key={index}>
            <InputContainer width='560px' iconOutside>
              <input
                type='text'
                data-lpignore={true}
                // ref={e => formValues.current['email'] = e}
                value={e.email}
                disabled
              />
              <InputTextButton
                variantGray
                isVisible
              >
                <a onClick={(evt) => openPermissions(evt, index + 1)}>
                  {e.editTempPermission}
                </a>

                <DropdownTextButton
                  isOpen={isOpenPermissions[index + 1]}
                >
                  {permissionsList.map((e, indexPermission) => (
                    <li key={indexPermission}>
                      <a onClick={(evt) => changePermission(evt, index + 1, indexPermission)}>
                        {e}
                      </a>
                    </li>
                  ))}
                </DropdownTextButton>
              </InputTextButton>
              <InputIconOutside onClick={() => handleSubmitPermission(index)} />
            </InputContainer>
          </FormRow>
        ))}
      </FormGroup>
    </>
  )

  const tabs = {
    'edit-password': EditPassword,
    'invite-team': InviteTeam
  }

  const handleTab = useCallback((e: string) => {
    setTabActive(e)
    setPages([
      {
        name: 'Configurações',
        url: `${url.baseUrl}/settings`
      },
      {
        name: e === 'invite-team'
          ? 'Times' : 'Alterar senha',
        url: `${url.baseUrl}/${e}`
      }
    ])
  }, [])

  return (
    <>
      <SEO
        title='Swipe'
        shouldExcludeTitleSuffix
        image='logo.png'
      />
      <Header profile={profile.data} />
      <Wrapper>
        <PerfectScrollbar>
          <StyledMain>
            <BreadCrumb
              pages={pages}
            />
            <StyledHeader>
              <TitleContainer>
                <Title>Configurações</Title>
              </TitleContainer>
            </StyledHeader>
            {/* <FitContainer> */}
              <TabsContainer className='mt-40' width='1000px'>
                <ShadowBox>
                  <TabsContent>
                    {tabs[tabActive]}
                  </TabsContent>
                </ShadowBox>
                <header>
                  <Tab
                    active={tabActive === 'edit-password'}
                  >
                    <Link href={`${url.baseUrl}/settings/edit-password`} shallow>
                      <a onClick={() => handleTab('edit-password')}>
                        Alterar senha
                      </a>
                    </Link>
                  </Tab>
                  <Tab
                    active={tabActive === 'invite-team'}
                  >
                    <Link href={`${url.baseUrl}/settings/invite-team`} shallow>
                      <a onClick={() => handleTab('invite-team')}>
                        Times
                      </a>
                    </Link>
                  </Tab>
                </header>
              </TabsContainer>
            {/* </FitContainer> */}
          </StyledMain>
        </PerfectScrollbar>
        <Sidebar />
      </Wrapper>
      {isModal && (
        <AlertModal
          message={message}
          close={close}
          titleColor={['primary', 'main']}
          backgroundColorButton={['primary', 'main']}
          textColorButton={['white', 'main']}
        />
      )}
    </>
  )
}

export default Settings

export const getServerSideProps = settingsServerSideProps
