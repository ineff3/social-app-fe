import { SchemaMessageResponseDto } from '@/src/types/schema'
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

export function groupMessagesByDate(messages: SchemaMessageResponseDto[]) {
  return messages.reduce(
    (acc: Record<string, SchemaMessageResponseDto[]>, message) => {
      const date = format(new Date(message.createdAt), 'yyyy-MM-dd')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(message)
      return acc
    },
    {},
  )
}
