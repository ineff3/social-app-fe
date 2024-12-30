import {
  SchemaGetAllMessagesResponseDto,
  SchemaMessageResponseDto,
} from '@/src/types/schema'
import { InfiniteData } from '@tanstack/react-query'

export const appendNewMessage = (newMessage: SchemaMessageResponseDto) => {
  return (oldData: InfiniteData<SchemaGetAllMessagesResponseDto>) => {
    const newData = {
      pages: oldData.pages.map((page, index) => {
        return index === 0
          ? { ...page, data: [...page.data, newMessage] }
          : page
      }),
      pageParams: oldData.pageParams,
    }
    return newData
  }
}

export const updateReadMessage = (id: string) => {
  return (oldData: InfiniteData<SchemaGetAllMessagesResponseDto>) => {
    const newData = {
      pages: oldData.pages.map((page) => {
        const data = page.data.map((message) =>
          message.id === id ? { ...message, status: 'read' } : message,
        )
        return { ...page, data }
      }),
      pageParams: oldData.pageParams,
    }
    return newData
  }
}
