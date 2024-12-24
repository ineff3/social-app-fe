import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'
import { RefObject, useEffect } from 'react'
import { PendingMessageType } from '../../interfaces'
import { PendingMessage } from './PendingMessage'
import { useInView } from 'react-intersection-observer'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
  scrollElementRef: RefObject<HTMLDivElement>
  pendingMessages: PendingMessageType[]
}

const MESSAGE_PER_PAGE = 30
const FETCH_NEXT_MESSAGE_INDEX = Math.ceil(MESSAGE_PER_PAGE / 4)

export const MessageFlow = ({
  conversationId,
  recipient,
  scrollElementRef,
  pendingMessages,
}: Props) => {
  const { data, isLoading, fetchNextPage } = useGetMessages(
    { limit: MESSAGE_PER_PAGE },
    conversationId,
  )
  const { ref: fetchNextRef, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  useHandleIncomingMessage(conversationId)

  useEffect(() => {
    const element = scrollElementRef.current
    if (!isLoading && element) {
      element.scrollTo(0, element.scrollHeight)
    }
  }, [isLoading, scrollElementRef])

  return (
    <div className="flex flex-col gap-4 p-4">
      {data &&
        data.pages.flatMap((page, pageIndex) =>
          page.data.map((message, messageIndex) => (
            <div
              key={message.id}
              ref={
                pageIndex === 0 && messageIndex === FETCH_NEXT_MESSAGE_INDEX
                  ? fetchNextRef
                  : undefined
              }
            >
              <Message
                message={message}
                isFromCurrentUser={message.senderId !== recipient.id}
              />
            </div>
          )),
        )}
      {pendingMessages.map((message) => (
        <PendingMessage
          key={`pending-${message.id}`}
          pendingMessage={message}
        />
      ))}
    </div>
  )
}
