import { useSocketConnection } from '@/src/hooks/useSocketConnection'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { ConversationsPanel } from './ConversationsPanel'
import { ConversationContainer } from './ConversationContainer'
import { useEffect } from 'react'
import { useAppDispatch } from '@/src/redux/hooks'
import { selectConversation } from '@/src/redux/chat/chatSlice'
import { useModal } from '@/src/hooks/useModal'
import Modal from '@/src/components/ui/Modal'
import { ConversationModalContent } from './conversation-modal/ConversationModalContent'

export const ConversationsPage = () => {
  const dispatch = useAppDispatch()
  const { show, close, visible } = useModal()
  useSocketConnection(conversationSocketInstance)

  useEffect(() => {
    return () => {
      dispatch(selectConversation(null))
    }
  }, [dispatch])

  return (
    <>
      <div className=" flex">
        <ConversationsPanel show={show} />
        <ConversationContainer show={show} />
      </div>
      <Modal isOpen={visible} onClose={close} maxWidth="max-w-md">
        <ConversationModalContent close={close} />
      </Modal>
    </>
  )
}
