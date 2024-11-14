import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { GetAllPostsParams } from '@/src/utils/api/interfaces'
import { getNextPageParam } from '@/src/features/posts/utils/getNextPageParam'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetPosts = (params: GetAllPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all(params),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetPosts
