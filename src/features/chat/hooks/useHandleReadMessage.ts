import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import { updateReadMessage } from '../common/cacheUpdaters'

const READ_MESSAGE_EVENT = 'readMessage'

export const useHandleReadMessage = (conversationId: string) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleReadMessage = (messageId: string) => {
      const key = queryKeyStore.chat.messages(
        { unread: false },
        conversationId,
      ).queryKey
      queryClient.setQueryData(key, updateReadMessage(messageId))
    }

    conversationSocketInstance.on(READ_MESSAGE_EVENT, handleReadMessage)

    return () => {
      conversationSocketInstance.off(READ_MESSAGE_EVENT, handleReadMessage)
    }
  }, [conversationId, queryKeyStore, queryClient])
}
