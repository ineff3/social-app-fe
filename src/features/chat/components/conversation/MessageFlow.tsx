import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'
import { RefObject, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  calculateNextFetchMessageIndex,
  checkHasUnreadMessages,
  getLastReadMessageId,
  groupMessagesByDate,
} from '../../common/messageHelpers'
import { formatDateForToday } from '@/src/features/posts/utils/dateConversions'
import { PendingMessages } from './PendingMessages'
import { useInitialScroll } from '../../hooks/useInitialScroll'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
  scrollElementRef: RefObject<HTMLDivElement>
}

const MESSAGE_PER_PAGE = 30
const MAX_CHAT_VISIBLE_MESSAGES = 15

export const MessageFlow = ({
  conversationId,
  recipient,
  scrollElementRef,
}: Props) => {
  const {
    data: readMessages,
    isLoading: isReadLoading,
    fetchNextPage,
  } = useGetMessages({ limit: MESSAGE_PER_PAGE, unread: false }, conversationId)

  const { data: unreadMessages, isLoading: isUnreadLoading } = useGetMessages(
    { limit: MESSAGE_PER_PAGE, unread: true },
    conversationId,
  )
  const hasUnreadMessages = checkHasUnreadMessages(unreadMessages)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { ref: fetchNextRef, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  useHandleIncomingMessage(conversationId, hasUnreadMessages)
  useInitialScroll({
    conversationId,
    isLoading: isReadLoading || isUnreadLoading,
    lastMessageRef,
    scrollElementRef,
  })

  const groupedMessages =
    readMessages &&
    unreadMessages &&
    groupMessagesByDate(readMessages, unreadMessages)

  const lastReadMessageId = getLastReadMessageId(readMessages)

  return (
    <div className="flex flex-col p-4">
      {groupedMessages &&
        Array.from(groupedMessages.entries()).map(
          ([date, messages], pageIndex) => (
            <div key={date} className="flex flex-col">
              <div className="sticky top-4 z-10 m-[10px_auto_10px_auto] flex w-fit items-center justify-center rounded-full bg-base-200 bg-opacity-60 px-2 py-1 text-xs text-secondary">
                {formatDateForToday(new Date(date))}
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
                  <div
                    ref={
                      message.id === lastReadMessageId
                        ? lastMessageRef
                        : undefined
                    }
                  >
                    <Message
                      conversationId={conversationId}
                      message={message}
                      isFromCurrentUser={message.senderId !== recipient.id}
                    />
                    {hasUnreadMessages && message.id === lastReadMessageId && (
                      <div className=" my-4 flex w-full items-center justify-center rounded-md bg-base-200 py-1.5 text-sm text-secondary">
                        Unread messages
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ),
        )}
      <PendingMessages conversationId={conversationId} />
    </div>
  )
}
