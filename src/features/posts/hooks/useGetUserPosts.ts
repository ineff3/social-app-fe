import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import {
  SchemaGetAllPostsResponseDto,
  SchemaGetPostsQueryDto,
} from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'

const useGetUserPosts = (
  query: SchemaGetPostsQueryDto & { userId: string },
) => {
  const queryKeyStore = useQueryKeyStore()
  const pureQuery = { ...query } as Partial<
    SchemaGetPostsQueryDto & { userId: string }
  >
  delete pureQuery.userId
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all(pureQuery)._ctx.user(query.userId),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetUserPosts
