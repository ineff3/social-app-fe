import { useAppSelector } from '@/src/redux/hooks'
import { ConversationPreview } from './ConversationPreview'
import { Conversation } from './conversation/Conversation'
import { useHandleNewMessageNotification } from '../hooks/useHandleNewMessageNotification'
import { useFetchCachedConversation } from '../hooks/useFetchCachedConversation'
import { selectSelectedConversationId } from '@/src/redux/chat/chatSlice'

interface Props {
  show: () => void
}

export const ConversationContainer = ({ show }: Props) => {
  const conversationId = useAppSelector(selectSelectedConversationId)

  const conversation = useFetchCachedConversation(conversationId)

  useHandleNewMessageNotification()

  return (
    <div className=" h-screen w-[600px]  border-r border-accent">
      {conversation ? (
        <Conversation conversation={conversation} key={conversation.id} />
      ) : (
        <ConversationPreview show={show} />
      )}
    </div>
  )
}
