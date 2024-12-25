import { SchemaParticipantResponseDto } from '@/src/types/schema'
import { useGetMessages } from '../../hooks/useGetMessages'
import { Message } from './Message'
import { useHandleIncomingMessage } from '../../hooks/useHandleIncomingMessage'
import { RefObject, useEffect } from 'react'
import { ExtendedChatMessage } from '../../interfaces'
import { useInView } from 'react-intersection-observer'
import { useAppSelector } from '@/src/redux/hooks'
import { selectChatScrollPosition } from '@/src/redux/chat/chatSlice'
import {
  calculateNextFetchMessageIndex,
  groupMessagesByDate,
} from '../../common/messageHelpers'
import { formatDateForToday } from '@/src/features/posts/utils/dateConversions'

interface Props {
  conversationId: string
  recipient: SchemaParticipantResponseDto
  scrollElementRef: RefObject<HTMLDivElement>
  pendingMessages: ExtendedChatMessage[]
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
    <div className="flex flex-col p-4">
      {groupedMessages &&
        Object.entries(groupedMessages).map(([date, messages], pageIndex) => (
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
                <Message
                  message={message}
                  isFromCurrentUser={message.senderId !== recipient.id}
                />
              </div>
            ))}
          </div>
        ))}
      {pendingMessages.map((message) => (
        <Message key={message.id} message={message} isFromCurrentUser={true} />
      ))}
    </div>
  )
}
