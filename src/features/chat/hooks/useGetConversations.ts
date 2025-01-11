import { SchemaGetAllConversationsResponseDto } from '@/src/generated/schema'
import { getNextPageParam } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { PaginatedQueryParams } from '@/src/utils/api/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetConversations = (params: PaginatedQueryParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllConversationsResponseDto>({
    ...queryKeyStore.chat.conversations(params),
    initialPageParam: 1,
    getNextPageParam,
  })
}
