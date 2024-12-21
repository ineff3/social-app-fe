import { selectSelectedConversation } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { ConversationPreview } from './ConversationPreview'
import { Conversation } from './conversation/Conversation'

export const ConversationContainer = () => {
  const conversation = useAppSelector(selectSelectedConversation)

  return (
    <div className="fixed ml-[420px] h-screen w-full max-w-[600px]  border-r border-accent">
      {conversation ? (
        <Conversation conversation={conversation} />
      ) : (
        <ConversationPreview />
      )}
    </div>
  )
}
