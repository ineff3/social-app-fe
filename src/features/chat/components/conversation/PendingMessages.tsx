import { selectPendingMessages } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { Message } from './Message'

interface Props {
  conversationId: string
}

export const PendingMessages = ({ conversationId }: Props) => {
  const pendingMessages = useAppSelector(selectPendingMessages(conversationId))
  return (
    <>
      {pendingMessages &&
        pendingMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isFromCurrentUser={true}
          />
        ))}
    </>
  )
}
