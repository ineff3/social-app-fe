import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'

export const useChatRoomSubscription = (conversationId: string) => {
  useEffect(() => {
    conversationSocketInstance.emit('enterRoom', conversationId)

    return () => {
      conversationSocketInstance.emit('leaveRoom', conversationId)
    }
  }, [conversationId])
}
