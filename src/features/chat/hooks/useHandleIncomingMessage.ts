import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { SchemaGetAllMessagesResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'

const EVENT_NEW_MESSAGE = 'newMessage'

export const useHandleIncomingMessage = (conversationId: string) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleIncomingMessage = (newMessage: string) => {
      const key = queryKeyStore.chat.messages({}, conversationId).queryKey
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<SchemaGetAllMessagesResponseDto>) => {
          const newData = {
            pages: oldData.pages.map((page, index) => {
              return index === 0
                ? { ...page, data: [...page.data, JSON.parse(newMessage)] }
                : page
            }),
            pageParams: oldData.pageParams,
          }
          return newData
        },
      )
      queryClient.invalidateQueries({ queryKey: key })
    }
    conversationSocketInstance.on(EVENT_NEW_MESSAGE, handleIncomingMessage)

    return () => {
      conversationSocketInstance.off(EVENT_NEW_MESSAGE, handleIncomingMessage)
    }
  }, [conversationId, queryClient, queryKeyStore])
}
