import { SchemaGetAllNotificationsResponseDto } from '@/src/generated/schema'
import { getNextPageParam } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import {
  GetAllNotificationsParams,
  PaginatedQueryParams,
} from '@/src/utils/api/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetNotifications = (
  query: PaginatedQueryParams,
  params: GetAllNotificationsParams,
) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllNotificationsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.notifications(params),
    initialPageParam: 1,
    getNextPageParam,
  })
}
