import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'
import { RefObject, useEffect } from 'react'
import { PendingMessageType } from '../../interfaces'
import { PendingMessage } from './PendingMessage'
import { useInView } from 'react-intersection-observer'
import { useAppSelector } from '@/src/redux/hooks'
import { selectChatScrollPosition } from '@/src/redux/chat/chatSlice'
import { format } from 'date-fns'
import {
  calculateNextFetchMessageIndex,
  groupMessagesByDate,
} from '../../common/messageHelpers'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
  scrollElementRef: RefObject<HTMLDivElement>
  pendingMessages: PendingMessageType[]
}

const MESSAGE_PER_PAGE = 30
const MAX_CHAT_VISIBLE_MESSAGES = 15

export const MessageFlow = ({
  conversationId,
  recipient,
  scrollElementRef,
  pendingMessages,
}: Props) => {
  const storedScrollPosition = useAppSelector(
    selectChatScrollPosition(conversationId),
  )
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

  useEffect(
    function initialScroll() {
      const element = scrollElementRef.current
      if (!storedScrollPosition && !isLoading && element) {
        element.scrollTo(0, element.scrollHeight)
      }
    },
    [isLoading, scrollElementRef, storedScrollPosition],
  )
  const groupedMessages =
    data && groupMessagesByDate(data.pages.flatMap((page) => page.data))
  return (
    <div className="flex flex-col gap-4 p-4">
      {groupedMessages &&
        Object.entries(groupedMessages).map(([date, messages], pageIndex) => (
          <div key={date} className="flex flex-col">
            {/* Date Header */}
            <div className="sticky top-0 bg-base-200 py-1 text-center text-xs">
              {format(new Date(date), 'EEEE, MMMM d')}
            </div>
            {messages.map((message, messageIndex) => (
              <div
                key={message.id}
                ref={
                  pageIndex === 0 &&
                  messageIndex ===
                    calculateNextFetchMessageIndex(
                      messages.length,
                      MESSAGE_PER_PAGE,
                      MAX_CHAT_VISIBLE_MESSAGES,
                    )
                    ? fetchNextRef
                    : undefined
                }
              >
                <Message
                  message={message}
                  isFromCurrentUser={message.senderId !== recipient.id}
                />
              </div>
            ))}
          </div>
        ))}
      {pendingMessages.map((message) => (
        <PendingMessage
          key={`pending-${message.id}`}
          pendingMessage={message}
        />
      ))}
    </div>
  )
}
