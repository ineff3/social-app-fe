import {
  SchemaConversationResponseDto,
  SchemaGetAllMessagesResponseDto,
  SchemaMessageResponseDto,
} from '@/src/generated/schema'
import { handleUpdater } from '@/src/utils/api/helpers'
import { InfiniteData } from '@tanstack/react-query'

export const appendNewMessage = (
  newMessage: SchemaMessageResponseDto,
  isToUnread: boolean,
) => {
  return (oldData: InfiniteData<SchemaGetAllMessagesResponseDto>) => {
    const newData = {
      pages: oldData.pages.map((page, index) => {
        return index === (isToUnread ? oldData.pages.length - 1 : 0)
          ? { ...page, data: [...page.data, newMessage] }
          : page
      }),
      pageParams: oldData.pageParams,
    }
    return newData
  }
}

export const updateDeletedMessage = (
  oldData: InfiniteData<SchemaGetAllMessagesResponseDto>,
  deletedMessageId: string,
): InfiniteData<SchemaGetAllMessagesResponseDto> => {
  return {
    pages: oldData.pages.map((page) => ({
      ...page,
      data: page.data.filter((message) => message.id !== deletedMessageId),
    })),
    pageParams: oldData.pageParams,
  }
}

export const updateReadMessage = (id: string) => {
  return handleUpdater<SchemaMessageResponseDto>(id, (message) => ({
    ...message,
    status: 'read',
  }))
}

export const incrementConversationMessageCounter = (conversationId: string) => {
  return updateConversationMessageCounter(1, conversationId)
}

export const decrementConversationMessageCounter = (conversationId: string) => {
  return updateConversationMessageCounter(-1, conversationId)
}

const updateConversationMessageCounter = (
  value: number,
  conversationId: string,
) => {
  return handleUpdater<SchemaConversationResponseDto>(
    conversationId,
    (conversation) => ({
      ...conversation,
      unreadAmount: conversation.unreadAmount + value,
    }),
  )
}

export const resetConversationUnreadAmount = (conversationId: string) => {
  return handleUpdater<SchemaConversationResponseDto>(
    conversationId,
    (conversation) => ({
      ...conversation,
      unreadAmount: 0,
    }),
  )
}
