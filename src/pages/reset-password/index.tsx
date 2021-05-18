import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import Header from '@/components/loginComponents/Header'
import FormResetSendEmail from '@/components/loginComponents/FormResetSendEmail'
import { FormMain } from '@/styles/pages/login'
import { loginServerSideProps } from '@/serverSideFunctions/pages/login'

const AlertModal = dynamic(
  () => import ('@/components/AlertModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const ResetPassword = () => {
  const close = useCallback(() => {
    setIsModal(false)
  }, [])

  const [isModal, setIsModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  return (
    <>
      <SEO
        title='Swipe'
        shouldExcludeTitleSuffix
        image='logo.png'
      />
      <Header />
      <FormMain>
        <FormResetSendEmail
          setIsModal={setIsModal}
          setTitle={setTitle}
          setMessage={setMessage}
        />
      </FormMain>
      {
        isModal && (
          <AlertModal
            title={title}
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

export default ResetPassword

export const getServerSideProps = loginServerSideProps
