import { SchemaGetAllNotificationsResponseDto } from '@/src/types/schema'
import { getNextPageParam } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { PaginatedQueryParams } from '@/src/utils/api/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetNotifications = (query: PaginatedQueryParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllNotificationsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.notifications,
    initialPageParam: 1,
    getNextPageParam,
  })
}
