import { useQueryClient } from '@tanstack/react-query'
import { conversationSocketInstance } from '../conversationSocketInstance'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { SchemaCreateMessageDto } from '@/src/types/schema'
import { ResponseAcknowledgement } from '../interfaces'
import { useAppDispatch } from '@/src/redux/hooks'
import {
  removePendingChatMessage,
  updatePendingMessageStatus,
} from '@/src/redux/chat/chatSlice'
import { chatEvents } from '@/src/events'

export const useSendMessage = () => {
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

    conversationSocketInstance.emit(
      chatEvents.MESSAGE.SEND,
      data,
      async (response: ResponseAcknowledgement) => {
        await queryClient.invalidateQueries({ queryKey: readKey })

        queryClient.setQueryData(unreadKey, () => ({
          pages: [{ data: [], nextCursor: null }],
          pageParams: [null],
        }))

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

        await queryClient.invalidateQueries({ queryKey: unreadKey })
      },
    )
  }

  return sendMessage
}
