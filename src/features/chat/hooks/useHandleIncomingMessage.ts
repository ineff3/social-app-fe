import { useEffect } from 'react'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQueryClient } from '@tanstack/react-query'
import {
  appendNewMessage,
  incrementConversationMessageCounter,
} from '../common/cacheUpdaters'
import { isScrolledToBottom } from '../common/scrollHelpers'
import { chatEvents } from '@/src/events'
import { TriggerScrollToBottom } from './useTriggerScrollToBottom'

export const useHandleIncomingMessage = (
  conversationId: string,
  hasUnreadMessages: boolean | null,
  triggerScrollToBottom: TriggerScrollToBottom,
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
        triggerScrollToBottom('instant')
      }
    }
    conversationSocketInstance.on(chatEvents.MESSAGE.NEW, handleIncomingMessage)

    return () => {
      conversationSocketInstance.off(
        chatEvents.MESSAGE.NEW,
        handleIncomingMessage,
      )
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
