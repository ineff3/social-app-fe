import { useAppSelector } from '@/src/redux/hooks'
import { ConversationPreview } from './ConversationPreview'
import { Conversation } from './conversation/Conversation'
import { useHandleNewMessageNotification } from '../hooks/useHandleNewMessageNotification'
import { useFetchCachedConversation } from '../hooks/useFetchCachedConversation'
import { selectSelectedConversationId } from '@/src/redux/chat/chatSlice'
import { ConversationHeader } from './conversation/ConversationHeader'

interface Props {
  show: () => void
}

export const ConversationContainer = ({ show }: Props) => {
  const conversationId = useAppSelector(selectSelectedConversationId)

  const conversation = useFetchCachedConversation(conversationId)

  useHandleNewMessageNotification()

  return (
    <div className="flex h-screen w-full max-w-[700px] flex-shrink-0 border-r border-accent  lg:w-[600px] lg:max-w-none ">
      {conversation ? (
        <Conversation
          conversation={conversation}
          key={conversation.id}
          Header={<ConversationHeader conversation={conversation} />}
        />
      ) : (
        <ConversationPreview show={show} />
      )}
    </div>
  )
}
