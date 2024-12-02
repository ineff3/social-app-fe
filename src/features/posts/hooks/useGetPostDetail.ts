import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQuery } from '@tanstack/react-query'

export const useGetPostDetail = (postId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return useQuery({
    ...queryKeyStore.posts.detail(postId),
  })
}
