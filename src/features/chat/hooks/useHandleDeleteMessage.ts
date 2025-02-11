import { chatEvents } from '@/src/events'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

export const useHandleDeleteMessage = (conversationId: string) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  const readKey = queryKeyStore.chat.messages(
    { unread: false },
    conversationId,
  ).queryKey
  const unreadKey = queryKeyStore.chat.messages(
    { unread: true },
    conversationId,
  ).queryKey

  useEffect(() => {
    const handleDeleteMessage = () => {
      queryClient.invalidateQueries({ queryKey: readKey })
      queryClient.invalidateQueries({ queryKey: unreadKey })
    }

    conversationSocketInstance.on(
      chatEvents.MESSAGE.DELETE,
      handleDeleteMessage,
    )

    return () => {
      conversationSocketInstance.off(
        chatEvents.MESSAGE.DELETE,
        handleDeleteMessage,
      )
    }
  }, [queryKeyStore, queryClient, readKey, unreadKey])
}
