import { formatMessageDate } from '@/src/features/posts/utils/dateConversions'
import { ExtendedChatMessage } from '../../../interfaces'
import { MessageStatus } from './MessageStatus'

interface Props {
  message: ExtendedChatMessage
  isFromCurrentUser: boolean
}

export const MessageCaption = ({ message, isFromCurrentUser }: Props) => {
  return (
    <div className="flex flex-grow items-center justify-end gap-1 self-end text-xs italic text-secondary">
      <time dateTime={message.createdAt}>
        {formatMessageDate(new Date(message.createdAt))}
      </time>
      {isFromCurrentUser && <MessageStatus status={message.status} />}
    </div>
  )
}
