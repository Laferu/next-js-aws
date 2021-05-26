import {
  useCallback,
  useContext
} from 'react'

import { GlobalContext } from '@/utils/Context'

const useConfirmModal = (message: string, handle: Function) => {
  const { state: {
    setIsConfirmModal,
    setMessageConfirmModal
  }, functions: {
    setHandleConfirmModal
  } } = useContext(GlobalContext)

  const handleConfirmModal = useCallback(() => {
    setMessageConfirmModal(message)
    setIsConfirmModal(true)
    setHandleConfirmModal(() => handle)

    return message
  }, [message, handle])

  return {
    run: handleConfirmModal
  }
}

export default useConfirmModal
