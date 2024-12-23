import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'
import { RefObject, useEffect } from 'react'
import { PendingMessageType } from '../../interfaces'
import { PendingMessage } from './PendingMessage'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
  scrollElementRef: RefObject<HTMLDivElement>
  pendingMessages: PendingMessageType[]
}

export const MessageFlow = ({
  conversationId,
  recipient,
  scrollElementRef,
  pendingMessages,
}: Props) => {
  const { data, isLoading } = useGetMessages({ limit: 20 }, conversationId)

  useHandleIncomingMessage(conversationId)

  useEffect(() => {
    const element = scrollElementRef.current
    if (!isLoading && element) {
      element.scrollTo(0, element.scrollHeight)
    }
  }, [isLoading, scrollElementRef])

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
      {pendingMessages.map((message) => (
        <PendingMessage key={message.id} pendingMessage={message} />
      ))}
    </div>
  )
}
