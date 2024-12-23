import { formatMessageDate } from '@/src/features/posts/utils/dateConversions'
import { SchemaMessageResponseDto } from '@/src/types/schema'

interface Props {
  message: SchemaMessageResponseDto
  isFromCurrentUser: boolean
}

export const Message = ({ message, isFromCurrentUser }: Props) => {
  return (
    <div className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}>
      <div
        className={`chat-bubble ${isFromCurrentUser ? 'chat-bubble-primary' : 'text-secondary'}`}
      >
        {message.text}
      </div>
      {isFromCurrentUser && (
        <div className="chat-footer flex gap-1 opacity-50">
          <time dateTime={message.createdAt}>
            {formatMessageDate(new Date(message.createdAt))}
          </time>
          <span>·</span>
          <span>
            {message.status === 'sent' && 'Sent'}
            {message.status === 'read' && 'Seen'}
          </span>
        </div>
      )}
    </div>
  )
}
