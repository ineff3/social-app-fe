import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
}

export const MessageFlow = ({ conversationId, recipient }: Props) => {
  const { data } = useGetMessages({ limit: 20 }, conversationId)

  useHandleIncomingMessage(conversationId)

  return (
    <div className="flex flex-col gap-5 p-4">
      {data &&
        data.pages.flatMap((page) =>
          page.data.map((message) => (
            <Message
              key={message.id}
              message={message}
              isFromCurrentUser={message.senderId !== recipient.id}
            />
          )),
        )}
    </div>
  )
}
