import { SchemaReadMessageDto } from '@/src/types/schema'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import {
  decrementConversationMessageCounter,
  updateReadMessage,
} from '../common/cacheUpdaters'

export const useReadMessage = () => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const readMessage = async (readMessageBody: SchemaReadMessageDto) => {
    conversationSocketInstance.emit('readMessage', readMessageBody)
    const unreadMessageKey = queryKeyStore.chat.messages(
      { unread: true },
      readMessageBody.conversationId,
    ).queryKey
    queryClient.setQueryData(
      unreadMessageKey,
      updateReadMessage(readMessageBody.messageId),
    )

    const readMessageKey = queryKeyStore.chat.messages(
      { unread: false },
      readMessageBody.conversationId,
    ).queryKey
    queryClient.setQueryData(
      readMessageKey,
      updateReadMessage(readMessageBody.messageId),
    )

    const conversationKey = queryKeyStore.chat.conversations({}).queryKey
    queryClient.setQueryData(
      conversationKey,
      decrementConversationMessageCounter(readMessageBody.conversationId),
    )
    queryClient.invalidateQueries({ queryKey: conversationKey })
  }

  return readMessage
}
