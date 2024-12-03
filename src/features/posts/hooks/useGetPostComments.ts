import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { GetPostCommentsParams } from '@/src/utils/api/interfaces'
import { getNextPageParam } from '@/src/utils/getNextPageParam'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetPostComments = ({
  postId,
  query,
}: GetPostCommentsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.detail(postId)._ctx.comments(query),
    initialPageParam: 1,
    getNextPageParam,
  })
}
