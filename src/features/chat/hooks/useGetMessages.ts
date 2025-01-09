import {
  SchemaGetAllMessagesResponseDto,
  SchemaGetMessagesQueryDto,
} from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetMessages = (
  query: SchemaGetMessagesQueryDto,
  conversationId: string,
  gcTime?: number,
) => {
  const queryKeyStore = useQueryKeyStore()

  return useInfiniteQuery<SchemaGetAllMessagesResponseDto>({
    ...queryKeyStore.chat.messages(query, conversationId),
    initialPageParam: undefined,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    select: (data) =>
      query.unread
        ? { ...data }
        : {
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
          },
    gcTime,
  })
}
