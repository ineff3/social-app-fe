import { SchemaGetAllMessagesResponseDto } from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'

export const useCheckHasNextUnreadPage = () => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const checkHasNextUnreadPage = (conversationId: string) => {
    const unreadKey = queryKeyStore.chat.messages(
      { unread: true },
      conversationId,
    ).queryKey
    const data: InfiniteData<SchemaGetAllMessagesResponseDto> | undefined =
      queryClient.getQueryData(unreadKey)

    if (!data) return false

    const lastPage = data.pages[data.pages.length - 1]
    return lastPage.nextCursor !== null
  }

  return checkHasNextUnreadPage
}
