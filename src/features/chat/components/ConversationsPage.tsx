import { ConversationsPanel } from './ConversationsPanel'
import { ConversationContainer } from './ConversationContainer'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  selectConversation,
  selectSelectedConversationId,
} from '@/src/redux/chat/chatSlice'
import { useModal } from '@/src/hooks/useModal'
import Modal from '@/src/components/ui/Modal'
import { ConversationModalContent } from './conversation-modal/ConversationModalContent'
import { Helmet } from 'react-helmet-async'

export const ConversationsPage = () => {
  const dispatch = useAppDispatch()
  const isSelected = !!useAppSelector(selectSelectedConversationId)
  const { show, close, visible } = useModal()

  useEffect(() => {
    return () => {
      dispatch(selectConversation(null))
    }
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Messages | Linker</title>
        <meta
          name="description"
          content="Chat with your friends and stay connected on Linker."
        />
        <meta property="og:title" content="Messages | Linker" />
        <meta
          property="og:description"
          content="Stay in touch with friends and send messages instantly."
        />
      </Helmet>

      <div className=" flex lg:pr-5">
        <div className={`w-full ${isSelected && 'hidden lg:flex'}`}>
          <ConversationsPanel show={show} />
        </div>
        <div className={`w-full ${!isSelected && 'hidden lg:flex'}`}>
          <ConversationContainer show={show} />
        </div>
      </div>
      <Modal isOpen={visible} onClose={close} maxWidth="max-w-md">
        <ConversationModalContent close={close} />
      </Modal>
    </>
  )
}
