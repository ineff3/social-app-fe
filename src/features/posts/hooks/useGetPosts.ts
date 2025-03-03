import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { GetAllPostsParams } from '@/src/utils/api/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetPosts = (params: GetAllPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all(params),
    initialPageParam: undefined,
    getNextPageParam: ({ nextCursor }) => nextCursor,
  })
}

export default useGetPosts
