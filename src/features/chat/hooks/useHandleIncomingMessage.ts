import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import { updateMessages } from '../common/cacheUpdaters'

const EVENT_NEW_MESSAGE = 'newMessage'

export const useHandleIncomingMessage = (
  conversationId: string,
  hasUnreadMessages: boolean | null,
) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleIncomingMessage = (newMessage: string) => {
      const key = queryKeyStore.chat.messages(
        { unread: !!hasUnreadMessages },
        conversationId,
      ).queryKey
      queryClient.setQueryData(key, updateMessages(JSON.parse(newMessage)))
      queryClient.invalidateQueries({ queryKey: key })
    }
    conversationSocketInstance.on(EVENT_NEW_MESSAGE, handleIncomingMessage)

    return () => {
      conversationSocketInstance.off(EVENT_NEW_MESSAGE, handleIncomingMessage)
    }
  }, [conversationId, queryClient, queryKeyStore, hasUnreadMessages])
}
