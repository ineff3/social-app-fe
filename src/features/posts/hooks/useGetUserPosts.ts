import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { GetUserPostsParams } from '@/src/utils/api/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetUserPosts = ({ query, userId, isDraft }: GetUserPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.user(userId, isDraft),
    initialPageParam: undefined,
    getNextPageParam: ({ nextCursor }) => nextCursor,
  })
}

export default useGetUserPosts
