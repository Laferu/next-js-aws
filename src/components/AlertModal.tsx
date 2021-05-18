import {
  Mask,
  Container,
  Message,
  ButtonsContainer,
  ConfirmButton,
  CancelXButton
} from '@/styles/components/Modal'
import { MouseEventHandler, useCallback } from 'react'

interface ModalProps {
  close: Function
  title?: string
  message: string,
  titleColor?: [string, string]
  backgroundColorButton?: [string, string]
  textColorButton?: [string, string]
}

const AlertModal = ({
  close,
  title,
  message,
  titleColor,
  backgroundColorButton,
  textColorButton
}: ModalProps) => {
  const handleClose = useCallback((e: any) => {
    e.preventDefault()
    if(e.target === e.currentTarget) {
      close()
    }
  }, [])
  return (
    <Mask onClick={handleClose}>
      <Container>
        {title && (
          <Message variantColor={titleColor}>
            {title}
          </Message>
        )}

        <Message>
          {message}
        </Message>
        <ButtonsContainer>
          <ConfirmButton
            onClick={handleClose}
            backgroundColor={backgroundColorButton}
            textColor={textColorButton}
          >
            Ok
          </ConfirmButton>
        </ButtonsContainer>
        <CancelXButton onClick={handleClose} />
      </Container>
    </Mask>
  )
}

export default AlertModal
