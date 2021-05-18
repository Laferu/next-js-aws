import {
  Mask,
  Container,
  Message,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
  CancelXButton
} from '@/styles/components/Modal'
import { useCallback, useContext, MouseEvent } from 'react'

import { GlobalContext } from '@/utils/Context';

interface ModalProps {
  confirm: Function
  message: string
}

const ConfirmModal = ({ confirm, message }: ModalProps) => {
  const { state: {
    setIsConfirmModal,
    setMessageConfirmModal
  } } = useContext(GlobalContext)

  const handleClose = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if(e.target === e.currentTarget) {
      setIsConfirmModal(false)
      setMessageConfirmModal('')
    }
  }, [])

  const handleConfirm = useCallback(() => {
    confirm()
    setIsConfirmModal(false)
    setMessageConfirmModal('')
  }, [])
  return (
    <Mask onClick={handleClose}>
      <Container>
        <Message>
          {message}
        </Message>
        <ButtonsContainer>
          <CancelButton onClick={handleClose}>
            Não
          </CancelButton>
          <ConfirmButton onClick={handleConfirm}>
            Sim
          </ConfirmButton>
        </ButtonsContainer>

        <CancelXButton onClick={handleClose} />
      </Container>
    </Mask>
  )
}

export default ConfirmModal
