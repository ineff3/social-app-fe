import {
  SchemaCursorQueryDto,
  SchemaGetAllMessagesResponseDto,
} from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetMessages = (
  query: SchemaCursorQueryDto,
  conversationId: string,
) => {
  const queryKeyStore = useQueryKeyStore()

  return useInfiniteQuery<SchemaGetAllMessagesResponseDto>({
    ...queryKeyStore.chat.messages(query, conversationId),
    initialPageParam: undefined,
    getNextPageParam: ({ nextCursor }) => nextCursor,
  })
}
