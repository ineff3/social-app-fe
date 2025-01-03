import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { chatEvents } from '@/src/events'

export const useChatRoomSubscription = (conversationId: string) => {
  useEffect(() => {
    conversationSocketInstance.emit(chatEvents.ROOM.ENTER, conversationId)

    return () => {
      conversationSocketInstance.emit(chatEvents.ROOM.LEAVE, conversationId)
    }
  }, [conversationId])
}
