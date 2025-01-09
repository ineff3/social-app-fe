import { chatEvents } from '@/src/events'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { SchemaUserTypingDto } from '@/src/types/schema'
import { useCallback, useEffect, useState } from 'react'

const USER_TYPING_DELAY = 3000

export const useHandleUserTyping = (userId: string, conversationId: string) => {
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null)

  const triggerStopTyping = useCallback(() => {
    conversationSocketInstance.emit(chatEvents.TYPING.STOP, {
      conversationId,
      userId,
    } as SchemaUserTypingDto)
  }, [conversationId, userId])

  const handleKeyDown = () => {
    conversationSocketInstance.emit(chatEvents.TYPING.START, {
      conversationId,
      userId,
    } as SchemaUserTypingDto)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    const timeout = setTimeout(() => {
      triggerStopTyping()
    }, USER_TYPING_DELAY)

    setTypingTimeout(timeout)
  }

  useEffect(() => {
    return () => {
      triggerStopTyping()
    }
  }, [triggerStopTyping])

  return { handleKeyDown, triggerStopTyping }
}
