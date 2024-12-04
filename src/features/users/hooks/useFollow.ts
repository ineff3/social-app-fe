import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'

export const useFollow = (followeeId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return usePost({
    path: apiRoutes.follow(followeeId),
    qKey: queryKeyStore.users._def,
  })
}
