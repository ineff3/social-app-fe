import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useDelete } from '@/src/utils/api/mutations'

export const useDeleteConversation = () => {
  const queryKeyStore = useQueryKeyStore()
  return useDelete({
    path: apiRoutes.conversations,
    qKey: queryKeyStore.chat.conversations({}).queryKey,
  })
}
