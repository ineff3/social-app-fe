import { SchemaMessageResponseDto } from '@/src/types/schema'

interface Props {
  message: SchemaMessageResponseDto
  isFromCurrentUser: boolean
}

export const Message = ({ message, isFromCurrentUser }: Props) => {
  return (
    <div className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}>
      <div
        className={`chat-bubble ${isFromCurrentUser && 'chat-bubble-primary'}`}
      >
        {message.text}
      </div>
    </div>
  )
}
