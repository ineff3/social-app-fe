import { chatEvents } from '@/src/events'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaReadAllMessagesDto } from '@/src/types/schema'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { resetConversationUnreadAmount } from '../common/cacheUpdaters'

export const useHandleScrollToBottom = (
  scrollElementRef: React.RefObject<HTMLElement>,
  conversationId: string,
  triggerScrollToBottom: (behavior?: ScrollBehavior) => void,
) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const handleScrollToBottom = () => {
    const element = scrollElementRef.current
    if (!element) {
      return
    }
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
      chatEvents.MESSAGE.READ_ALL,
      {
        conversationId,
        userId: currentUserId,
      } as SchemaReadAllMessagesDto,
      async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: readKey }),
          queryClient.invalidateQueries({ queryKey: unreadKey }),
        ])
        queryClient.setQueryData(
          conversationKey,
          resetConversationUnreadAmount(conversationId),
        )
        queryClient.invalidateQueries({ queryKey: conversationKey })

        triggerScrollToBottom('smooth')
      },
    )
  }

  return handleScrollToBottom
}
