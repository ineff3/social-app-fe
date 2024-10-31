import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/hooks/useQueryKeyStore'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'
import { GetUserPostsParams } from '../../../utils/api/interfaces'

const useGetUserPosts = ({ query, userId, isDraft }: GetUserPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.user(userId, isDraft),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetUserPosts
