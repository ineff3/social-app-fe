import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQuery } from '@tanstack/react-query'

export const useGetOnlineUsers = () => {
  const queryKeyStore = useQueryKeyStore()

  return useQuery(queryKeyStore.chat.onlineUsers)
}
