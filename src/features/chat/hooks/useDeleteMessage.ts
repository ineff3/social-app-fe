import { SchemaDeleteMessageDto } from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { chatEvents } from '@/src/events'
import { useQueryClient } from '@tanstack/react-query'
import { updateDeletedMessage } from '../common/cacheUpdaters'
import { ResponseAcknowledgement } from '../interfaces'

export const useDeleteMessage = (conversationId: string) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  const readKey = queryKeyStore.chat.messages(
    { unread: false },
    conversationId,
  ).queryKey

  const deleteMessage = (data: SchemaDeleteMessageDto) => {
    const prevReadData = queryClient.getQueryData(readKey)
    queryClient.setQueryData(readKey, updateDeletedMessage)

    conversationSocketInstance.emit(
      chatEvents.MESSAGE.DELETE,
      data,
      async (response: ResponseAcknowledgement) => {
        if (response.status === 'error') {
          queryClient.setQueryData(readKey, prevReadData)
        }
        queryClient.invalidateQueries({ queryKey: readKey, exact: true })
      },
    )
  }

  return deleteMessage
}
