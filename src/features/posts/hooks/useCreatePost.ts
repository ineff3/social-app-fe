import { InfiniteData } from '@tanstack/react-query'
import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import useQueryKeyStore from '../../../utils/api/hooks/useQueryKeyStore'
import { IPost } from '../interfaces'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'

const useCreatePost = () => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<InfiniteData<SchemaGetAllPostsResponseDto>, FormData, IPost>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({}).queryKey,
    axiosOptions: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  })
}

export default useCreatePost
