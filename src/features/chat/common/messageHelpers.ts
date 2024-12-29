import {
  SchemaGetAllMessagesResponseDto,
  SchemaMessageResponseDto,
} from '@/src/types/schema'
import { InfiniteData } from '@tanstack/react-query'
import { format } from 'date-fns'

export const calculateNextFetchMessageIndex = (
  pageLength: number,
  messagesPerPage: number,
  maxVisibleMessages: number,
) => {
  if (pageLength < messagesPerPage) {
    if (pageLength < maxVisibleMessages) {
      return pageLength - 1
    }
  }
  return Math.ceil(messagesPerPage / 4)
}

export function groupMessagesByDate(
  readMessages: InfiniteData<SchemaGetAllMessagesResponseDto>,
  unreadMessages: InfiniteData<SchemaGetAllMessagesResponseDto>,
): Map<string, SchemaMessageResponseDto[]> {
  const messages = [
    ...readMessages.pages.flatMap((page) => page.data),
    ...unreadMessages.pages.flatMap((page) => page.data),
  ]
  return messages.reduce(
    (acc: Map<string, SchemaMessageResponseDto[]>, message) => {
      const date = format(new Date(message.createdAt), 'yyyy-MM-dd')
      const prev = acc.get(date) || []

      acc.set(date, [...prev, message])
      return acc
    },
    new Map(),
  )
}

export function getLastReadMessageId(
  readMessages: InfiniteData<SchemaGetAllMessagesResponseDto> | undefined,
) {
  if (!readMessages) {
    return null
  }
  const pages = readMessages.pages
  const data = pages[pages.length - 1].data
  const lastReadMessageId = data[data.length - 1]?.id

  return lastReadMessageId
}

export function checkHasUnreadMessages(
  unreadMessages: InfiniteData<SchemaGetAllMessagesResponseDto> | undefined,
) {
  if (!unreadMessages) {
    return null
  }
  const pages = unreadMessages.pages
  return pages.length > 0 && pages[0].data.length > 0
}
