import { chatEvents } from '@/src/events'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaReadAllMessagesDto } from '@/src/types/schema'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { resetConversationUnreadAmount } from '../common/cacheUpdaters'
import { TriggerScrollToBottom } from './useTriggerScrollToBottom'
import { setIsNextPageFetchEnabled } from '@/src/redux/chat/chatSlice'
import { useCheckHasNextUnreadPage } from './useCheckHasNextUnreadPage'

export const useHandleScrollToBottom = (
  scrollElementRef: React.RefObject<HTMLElement>,
  conversationId: string,
  triggerScrollToBottom: TriggerScrollToBottom,
) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const checkHasNextUnreadPage = useCheckHasNextUnreadPage()

  const readKey = queryKeyStore.chat.messages(
    { unread: false },
    conversationId,
  ).queryKey
  const unreadKey = queryKeyStore.chat.messages(
    { unread: true },
    conversationId,
  ).queryKey
  const conversationKey = queryKeyStore.chat.conversations({}).queryKey

  const handleScrollToBottom = () => {
    const element = scrollElementRef.current
    if (!element) {
      return
    }
    const hasNextUnreadPage = checkHasNextUnreadPage(conversationId)

    if (!hasNextUnreadPage) {
      triggerScrollToBottom('smooth')
      return
    }

    conversationSocketInstance.emit(
      chatEvents.MESSAGE.READ_ALL,
      {
        conversationId,
        userId: currentUserId,
      } as SchemaReadAllMessagesDto,
      async () => {
        dispatch(setIsNextPageFetchEnabled(false))
        await Promise.all([
          queryClient.refetchQueries({ queryKey: readKey }),
          queryClient.refetchQueries({ queryKey: unreadKey }),
        ])
        queryClient.setQueryData(
          conversationKey,
          resetConversationUnreadAmount(conversationId),
        )
        queryClient.invalidateQueries({ queryKey: conversationKey })

        triggerScrollToBottom('instant')
      },
    )
  }

  return handleScrollToBottom
}
