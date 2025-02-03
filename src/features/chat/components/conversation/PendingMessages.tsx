import { selectPendingMessages } from '@/src/redux/chat/chatSlice'
import { useAppSelector } from '@/src/redux/hooks'
import { Message } from './message/Message'
import { TriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'

interface Props {
  conversationId: string
  triggerScrollToBottom: TriggerScrollToBottom
}

export const PendingMessages = ({
  conversationId,
  triggerScrollToBottom,
}: Props) => {
  const pendingMessages = useAppSelector(selectPendingMessages(conversationId))
  return (
    <>
      {pendingMessages &&
        pendingMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isFromCurrentUser={true}
            conversationId={conversationId}
            triggerScrollToBottom={triggerScrollToBottom}
          />
        ))}
    </>
  )
}
