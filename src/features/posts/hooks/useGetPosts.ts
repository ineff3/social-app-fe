import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import { getNextPageParam } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { GetAllPostsParams } from '@/src/utils/api/interfaces'
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
