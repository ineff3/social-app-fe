import {
  SchemaGetAllMessagesResponseDto,
  SchemaMessageResponseDto,
} from '@/src/generated/schema'
import { InfiniteData } from '@tanstack/react-query'
import { format } from 'date-fns'

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
export function getPrevReadMessageId(
  readMessages: InfiniteData<SchemaGetAllMessagesResponseDto> | undefined,
) {
  if (!readMessages) {
    return null
  }
  const pages = readMessages.pages
  const data = pages[0].data
  const id = data[data.length - 1]?.id

  return id
}

export function checkHasUnreadMessages(
  unreadMessages: InfiniteData<SchemaGetAllMessagesResponseDto> | undefined,
) {
  if (!unreadMessages) {
    return false
  }
  const pages = unreadMessages.pages
  return pages.length > 0 && pages[0].data.length > 0
}

export function getFirstUnreadMessageId(
  unreadMessages: InfiniteData<SchemaGetAllMessagesResponseDto> | undefined,
) {
  if (!unreadMessages) {
    return null
  }
  const pages = unreadMessages.pages
  const data = pages[pages.length - 1].data
  const id = data[0]?.id

  return id
}
