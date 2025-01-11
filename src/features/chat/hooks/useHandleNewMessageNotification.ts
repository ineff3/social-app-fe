import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { SchemaMessageResponseDto } from '@/src/generated/schema'
import { incrementConversationMessageCounter } from '../common/cacheUpdaters'
import { chatEvents } from '@/src/events'

export const useHandleNewMessageNotification = () => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleNewMessageNotification = (newMessageJson: string) => {
      const newMessage = JSON.parse(newMessageJson) as SchemaMessageResponseDto

      const conversationKey = queryKeyStore.chat.conversations({}).queryKey
      queryClient.setQueryData(
        conversationKey,
        incrementConversationMessageCounter(newMessage.conversationId),
      )
      queryClient.invalidateQueries({ queryKey: conversationKey })
    }
    conversationSocketInstance.on(
      chatEvents.NOTIFICATION.NEW_MESSAGE,
      handleNewMessageNotification,
    )

    return () => {
      conversationSocketInstance.off(
        chatEvents.NOTIFICATION.NEW_MESSAGE,
        handleNewMessageNotification,
      )
    }
  }, [queryClient, queryKeyStore])
}
