import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import { useApi } from '../../../utils/api/actions'
import { apiRoutes } from '../../../routes'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'

const useGetBookmarkedPosts = ({ limit }: { limit: number }) => {
  const { get } = useApi()
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery({
    queryKey: queryKeyStore.posts.all._ctx.bookmarked.queryKey,
    queryFn: ({ pageParam }) =>
      get<SchemaGetAllPostsResponseDto>(apiRoutes.posts, {
        bookmarked: true,
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetBookmarkedPosts
