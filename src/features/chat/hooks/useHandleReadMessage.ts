import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import { updateReadMessage } from '../common/cacheUpdaters'
import { chatEvents } from '@/src/events'

export const useHandleReadMessage = (conversationId: string) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleReadMessage = (messageId: string) => {
      console.log('TRIGGERED')
      const key = queryKeyStore.chat.messages(
        { unread: false },
        conversationId,
      ).queryKey
      queryClient.setQueryData(key, updateReadMessage(messageId))
    }

    conversationSocketInstance.on(chatEvents.MESSAGE.READ, handleReadMessage)

    return () => {
      conversationSocketInstance.off(chatEvents.MESSAGE.READ, handleReadMessage)
    }
  }, [conversationId, queryKeyStore, queryClient])
}
