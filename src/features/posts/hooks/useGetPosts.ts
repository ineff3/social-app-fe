import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'
import { GetAllPostsParams } from '../../../utils/api/interfaces'

const useGetPosts = (params: GetAllPostsParams) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all(params),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetPosts
