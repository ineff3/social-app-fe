import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import { useApi } from '../../../utils/api/actions'
import { apiRoutes } from '../../../routes'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'

const useGetUserPosts = ({
  limit,
  userId,
}: {
  limit: number
  userId: string
}) => {
  const { get } = useApi()
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery({
    queryKey: queryKeyStore.posts.all._ctx.user(userId).queryKey,
    queryFn: ({ pageParam }) =>
      get<SchemaGetAllPostsResponseDto>(`${apiRoutes.posts}/${userId}`, {
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetUserPosts
