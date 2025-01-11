import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { chatEvents } from '@/src/events'
import { SchemaUserTypingDto } from '@/src/generated/schema'
import { useAppDispatch } from '@/src/redux/hooks'
import { addTypingUser, removeTypingUser } from '@/src/redux/chat/chatSlice'

export const useTrackUserTyping = () => {
  const dispatch = useAppDispatch()
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const trackUserStartTyping = (typingUser: SchemaUserTypingDto) => {
      dispatch(addTypingUser(typingUser))
    }

    conversationSocketInstance.on(chatEvents.TYPING.START, trackUserStartTyping)

    return () => {
      conversationSocketInstance.off(
        chatEvents.TYPING.START,
        trackUserStartTyping,
      )
    }
  }, [queryKeyStore, queryClient, dispatch])

  useEffect(() => {
    const trackUserStopTyping = (typingUser: SchemaUserTypingDto) => {
      dispatch(removeTypingUser(typingUser))
    }

    conversationSocketInstance.on(chatEvents.TYPING.STOP, trackUserStopTyping)

    return () => {
      conversationSocketInstance.off(
        chatEvents.TYPING.STOP,
        trackUserStopTyping,
      )
    }
  }, [queryKeyStore, queryClient, dispatch])
}
