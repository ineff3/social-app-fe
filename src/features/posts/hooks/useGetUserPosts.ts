import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'
import { GetUserPostsParams } from '../../../utils/api/interfaces'

const useGetUserPosts = ({ query, userId }: GetUserPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all({ query })._ctx.user(userId),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetUserPosts
