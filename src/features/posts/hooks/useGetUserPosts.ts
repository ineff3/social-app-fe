import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import { getNextPageParam } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { GetUserPostsParams } from '@/src/utils/api/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetUserPosts = ({ query, userId, isDraft }: GetUserPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.user(userId, isDraft),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetUserPosts
