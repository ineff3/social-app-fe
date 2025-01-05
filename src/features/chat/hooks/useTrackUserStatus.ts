import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { chatEvents } from '@/src/events'

export const useTrackUserStatus = () => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const trackUserOnlinePresence = (userId: string) => {
      const key = queryKeyStore.chat.onlineUsers.queryKey
      queryClient.setQueryData(key, (oldData: string[]) => [...oldData, userId])
      queryClient.invalidateQueries({ queryKey: key })
    }

    conversationSocketInstance.on(
      chatEvents.STATUS.ONLINE,
      trackUserOnlinePresence,
    )

    return () => {
      conversationSocketInstance.off(
        chatEvents.STATUS.ONLINE,
        trackUserOnlinePresence,
      )
    }
  }, [queryKeyStore, queryClient])

  useEffect(() => {
    const trackUserOfflinePresence = (userId: string) => {
      const key = queryKeyStore.chat.onlineUsers.queryKey
      queryClient.setQueryData(key, (oldData: string[]) =>
        oldData.filter((id) => id !== userId),
      )
      queryClient.invalidateQueries({ queryKey: key })
    }

    conversationSocketInstance.on(
      chatEvents.STATUS.OFFLINE,
      trackUserOfflinePresence,
    )

    return () => {
      conversationSocketInstance.off(
        chatEvents.STATUS.OFFLINE,
        trackUserOfflinePresence,
      )
    }
  }, [queryKeyStore, queryClient])
}
