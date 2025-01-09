import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'
import { RefObject, useRef } from 'react'
import {
  checkHasUnreadMessages,
  getFirstUnreadMessageId,
  getLastReadMessageId,
  getPrevReadMessageId,
  groupMessagesByDate,
} from '../../common/messageHelpers'
import { formatDateForToday } from '@/src/features/posts/utils/dateConversions'
import { PendingMessages } from './PendingMessages'
import { useInitialScroll } from '../../hooks/useInitialScroll'
import { useHandleIntersection } from '../../hooks/useHandleIntersection'
import { useStoreChatScrollPosition } from '../../hooks/useStoreChatScrollPosition'
import { TriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
  scrollElementRef: RefObject<HTMLDivElement>
  triggerScrollToBottom: TriggerScrollToBottom
}

const MESSAGE_PER_PAGE = 30

export const MessageFlow = ({
  conversationId,
  recipient,
  scrollElementRef,
  triggerScrollToBottom,
}: Props) => {
  const {
    data: readMessages,
    isLoading: isReadLoading,
    fetchNextPage: fetchNextReadPage,
  } = useGetMessages({ limit: MESSAGE_PER_PAGE, unread: false }, conversationId)

  const {
    data: unreadMessages,
    isLoading: isUnreadLoading,
    fetchNextPage: fetchNextUnreadPage,
  } = useGetMessages(
    { limit: MESSAGE_PER_PAGE, unread: true },
    conversationId,
    0,
  )

  const hasUnreadMessages = checkHasUnreadMessages(unreadMessages)
  const isLoading = isReadLoading || isUnreadLoading

  const lastReadMessageRef = useRef<HTMLDivElement>(null)
  const fetchReadRef = useHandleIntersection(fetchNextReadPage)
  const fetchUnreadRef = useHandleIntersection(fetchNextUnreadPage)

  useHandleIncomingMessage(
    conversationId,
    hasUnreadMessages,
    triggerScrollToBottom,
    scrollElementRef,
  )
  useStoreChatScrollPosition(scrollElementRef, conversationId, isLoading)
  useInitialScroll({
    conversationId,
    isLoading,
    lastReadMessageRef,
    scrollElementRef,
  })

  const groupedMessages =
    readMessages &&
    unreadMessages &&
    groupMessagesByDate(readMessages, unreadMessages)

  const prevReadMessageId = getPrevReadMessageId(readMessages)
  const lastReadMessageId = getLastReadMessageId(readMessages)
  const firstUnreadMessageId = getFirstUnreadMessageId(unreadMessages)

  return (
    <div className="flex flex-col p-4">
      {groupedMessages &&
        Array.from(groupedMessages.entries()).map(([date, messages]) => (
          <div key={date} className="flex flex-col">
            <div className="sticky top-4 z-10 m-[10px_auto_10px_auto] flex w-fit items-center justify-center rounded-full bg-base-200 bg-opacity-60 px-2 py-1 text-xs text-secondary">
              {formatDateForToday(new Date(date))}
            </div>
            {messages.map((message) => (
              <div
                key={message.id}
                ref={
                  message.id === prevReadMessageId ? fetchReadRef : undefined
                }
              >
                <div
                  ref={
                    message.id === lastReadMessageId
                      ? lastReadMessageRef
                      : undefined
                  }
                >
                  <div
                    ref={
                      message.id === firstUnreadMessageId
                        ? fetchUnreadRef
                        : undefined
                    }
                  >
                    <Message
                      conversationId={conversationId}
                      message={message}
                      isFromCurrentUser={message.senderId !== recipient.id}
                      triggerScrollToBottom={triggerScrollToBottom}
                    />
                    {hasUnreadMessages && message.id === lastReadMessageId && (
                      <div className=" my-4 flex w-full items-center justify-center rounded-md bg-base-200 py-1.5 text-sm text-secondary">
                        Unread messages
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      <PendingMessages conversationId={conversationId} />
    </div>
  )
}
