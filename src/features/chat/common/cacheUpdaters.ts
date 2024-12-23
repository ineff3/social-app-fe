import {
  SchemaGetAllMessagesResponseDto,
  SchemaMessageResponseDto,
} from '@/src/types/schema'
import { InfiniteData } from '@tanstack/react-query'

export const updateMessages = (newMessage: SchemaMessageResponseDto) => {
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
