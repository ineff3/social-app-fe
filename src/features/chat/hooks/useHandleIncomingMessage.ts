import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import {
  appendNewMessage,
  incrementConversationMessageCounter,
} from '../common/cacheUpdaters'
import { isScrolledToBottom } from '../common/scrollHelpers'

const EVENT_NEW_MESSAGE = 'newMessage'

export const useHandleIncomingMessage = (
  conversationId: string,
  hasUnreadMessages: boolean | null,
  triggerScrollToBottom: () => void,
  scrollElementRef: React.RefObject<HTMLDivElement>,
) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleIncomingMessage = (newMessage: string) => {
      const messageKey = queryKeyStore.chat.messages(
        { unread: !!hasUnreadMessages },
        conversationId,
      ).queryKey
      queryClient.setQueryData(
        messageKey,
        appendNewMessage(JSON.parse(newMessage), !!hasUnreadMessages),
      )
      // Not invalidating to prevent page shifts

      const conversationKey = queryKeyStore.chat.conversations({}).queryKey
      queryClient.setQueryData(
        conversationKey,
        incrementConversationMessageCounter(conversationId),
      )
      queryClient.invalidateQueries({ queryKey: conversationKey })
      const element = scrollElementRef.current
      if (!element) return
      if (isScrolledToBottom(element)) {
        triggerScrollToBottom()
      }
    }
    conversationSocketInstance.on(EVENT_NEW_MESSAGE, handleIncomingMessage)

    return () => {
      conversationSocketInstance.off(EVENT_NEW_MESSAGE, handleIncomingMessage)
    }
  }, [
    conversationId,
    queryClient,
    queryKeyStore,
    hasUnreadMessages,
    scrollElementRef,
    triggerScrollToBottom,
  ])
}
