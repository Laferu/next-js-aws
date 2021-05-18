import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import SEO from '@/components/SEO'
import Header from '@/components/loginComponents/Header'
import FormNewPassword from '@/components/loginComponents/FormNewPassword'
import { FormMain } from '@/styles/pages/login'
import { newPasswordServerSideProps } from '@/serverSideFunctions/pages/reset-password'

const AlertModal = dynamic(
  () => import ('@/components/AlertModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const NewPassword = () => {
  const { push } = useRouter()

  const [isModal, setIsModal] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [func, setFunc] = useState<{ run: Function }>({ run: () => {} })

  const close = useCallback(() => {
    setIsModal(false)
    func.run()
  }, [func])

  return (
    <>
      <SEO
        title='Swipe'
        shouldExcludeTitleSuffix
        image='logo.png'
      />
      <Header />
      <FormMain>
        <FormNewPassword
          setIsModal={setIsModal}
          setMessage={setMessage}
          setFunc={setFunc}
        />
      </FormMain>
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

export default NewPassword

export const getServerSideProps = newPasswordServerSideProps
