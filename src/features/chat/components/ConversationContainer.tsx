import { selectSelectedConversation } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { ConversationPreview } from './ConversationPreview'
import { Conversation } from './conversation/Conversation'

export const ConversationContainer = () => {
  const conversation = useAppSelector(selectSelectedConversation)

  return (
    <div className=" h-screen w-[600px]  border-r border-accent">
      {conversation ? (
        <Conversation conversation={conversation} key={conversation.id} />
      ) : (
        <ConversationPreview />
      )}
    </div>
  )
}
