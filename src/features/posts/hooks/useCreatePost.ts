import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'
import { SchemaCreatePostDto } from '@/src/generated/schema'

const useCreatePost = () => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<null, SchemaCreatePostDto>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({}).queryKey,
  })
}

export default useCreatePost
