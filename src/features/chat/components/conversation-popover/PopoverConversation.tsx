import { useFetchCachedConversation } from '../../hooks/useFetchCachedConversation'
import { useHandleNewMessageNotification } from '../../hooks/useHandleNewMessageNotification'
import { Conversation } from '../conversation/Conversation'
import { PopoverConversationHeader } from './PopoverConversationHeader'

interface Props {
  isOpen: boolean
  onToggle: () => void
  conversationId: string
}

export const PopoverConversation = ({
  isOpen,
  onToggle,
  conversationId,
}: Props) => {
  const conversation = useFetchCachedConversation(conversationId)

  useHandleNewMessageNotification()

  return (
    conversation && (
      <Conversation
        conversation={conversation}
        key={conversation.id}
        isMinimized={true}
        Header={
          <PopoverConversationHeader
            conversation={conversation}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        }
      />
    )
  )
}
