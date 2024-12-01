import { SchemaGetAllNotificationsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { PaginatedQueryParams } from '@/src/utils/api/interfaces'
import { getNextPageParam } from '@/src/utils/getNextPageParam'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetNotifications = (query: PaginatedQueryParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllNotificationsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.notifications,
    initialPageParam: 1,
    getNextPageParam,
  })
}
