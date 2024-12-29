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

export const useSendMessage = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const sendMessage = (data: SchemaCreateMessageDto, messageId: string) => {
    const { conversationId } = data
    conversationSocketInstance.emit(
      'sendMessage',
      data,
      (response: ResponseAcknowledgement) => {
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.chat.messages(
            { unread: false },
            conversationId,
          ).queryKey,
        })
        queryClient
          .invalidateQueries({
            queryKey: queryKeyStore.chat.messages(
              { unread: true },
              conversationId,
            ).queryKey,
          })
          .then(() => {
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
          })
      },
    )
  }

  return sendMessage
}
