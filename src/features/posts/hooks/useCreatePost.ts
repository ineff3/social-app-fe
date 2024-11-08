import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'

const useCreatePost = () => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<null, FormData>({
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
