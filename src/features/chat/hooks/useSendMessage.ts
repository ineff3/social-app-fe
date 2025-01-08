import { useQueryClient } from '@tanstack/react-query'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { SchemaCreateMessageDto } from '@/src/types/schema'
import { ResponseAcknowledgement } from '../interfaces'
import { useAppDispatch } from '@/src/redux/hooks'
import {
  removePendingChatMessage,
  setIsNextPageFetchEnabled,
  updatePendingMessageStatus,
} from '@/src/redux/chat/chatSlice'
import { chatEvents } from '@/src/events'
import { resetConversationUnreadAmount } from '../common/cacheUpdaters'
import { TriggerScrollToBottom } from './useTriggerScrollToBottom'

export const useSendMessage = (
  triggerScrollToBottom: TriggerScrollToBottom,
) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const sendMessage = (data: SchemaCreateMessageDto, messageId: string) => {
    const { conversationId } = data
    const readKey = queryKeyStore.chat.messages(
      { unread: false },
      conversationId,
    ).queryKey
    const unreadKey = queryKeyStore.chat.messages(
      { unread: true },
      conversationId,
    ).queryKey
    const conversationKey = queryKeyStore.chat.conversations({}).queryKey

    conversationSocketInstance.emit(
      chatEvents.MESSAGE.SEND,
      data,
      async (response: ResponseAcknowledgement) => {
        dispatch(setIsNextPageFetchEnabled(false))
        await queryClient.refetchQueries({ queryKey: readKey }),
          queryClient.setQueryData(unreadKey, () => ({
            pages: [{ data: [], nextCursor: null }],
            pageParams: [null],
          }))
        queryClient.setQueryData(
          conversationKey,
          resetConversationUnreadAmount(conversationId),
        )
        queryClient.invalidateQueries({ queryKey: conversationKey })

        if (response.status === 'error') {
          dispatch(
            updatePendingMessageStatus({
              conversationId,
              messageId,
              status: 'failed',
            }),
          )
        } else if (response.status === 'success') {
          dispatch(removePendingChatMessage({ conversationId, messageId }))
        }

        triggerScrollToBottom('instant')
      },
    )
  }

  return sendMessage
}
