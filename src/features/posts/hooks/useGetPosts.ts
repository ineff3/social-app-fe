import { useInfiniteQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import {
  SchemaGetAllPostsResponseDto,
  SchemaGetPostsQueryDto,
} from '../../../types/schema'
import { getNextPageParam } from '../../../utils/getNextPageParam'

const useGetPosts = (query: SchemaGetPostsQueryDto) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaGetAllPostsResponseDto>({
    ...queryKeyStore.posts.all(query),
    initialPageParam: 1,
    getNextPageParam,
  })
}

export default useGetPosts
