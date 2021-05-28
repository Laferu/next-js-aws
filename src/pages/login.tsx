import { useCallback, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import Header from '@/components/loginComponents/Header'
import FormLogin from '@/components/loginComponents/FormLogin'
import { FormMain } from '@/styles/pages/login'
import { loginServerSideProps } from '@/serverSideFunctions/pages/login'
import { Wrapper } from '@/styles/GlobalStyles'
import PerfectScrollbar from '@/components/PerfectScrollbar'

const AlertModal = dynamic(
  () => import ('@/components/AlertModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const Login = ({ teste = '???' }) => {
  useEffect(() => {
    console.log(teste)
  }, [])

  const close = useCallback(() => {
    setIsModal(false)
  }, [])

  const [isModal, setIsModal] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')

  return (
    <>
      <SEO
        title='Swipe'
        shouldExcludeTitleSuffix
        image='logo.png'
      />
      <Wrapper>
        <PerfectScrollbar>
          <Header />
          <FormMain>
            <FormLogin
              setIsModal={setIsModal}
              setMessageError={setMessageError}
            />
          </FormMain>
          {isModal && (
            <AlertModal
              message={messageError}
              close={close}
            />
          )}
        </PerfectScrollbar>
      </Wrapper>
    </>
  )
}

export default Login

export const getServerSideProps = loginServerSideProps
