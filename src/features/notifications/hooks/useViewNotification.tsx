import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useUpdate } from '@/src/utils/api/mutations'

export const useViewNotification = (notificationId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return useUpdate({
    path: apiRoutes.viewNotification(notificationId),
    qKey: queryKeyStore.posts.all({})._ctx.notifications._def,
  })
}
