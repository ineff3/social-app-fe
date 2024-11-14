import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/hooks/useQueryKeyStore'

const useFetchUserProfile = (username: string) => {
  const queryKeyStore = useQueryKeyStore()
  return useQuery({
    ...queryKeyStore.users.detail(username),
    staleTime: Infinity,
  })
}

export default useFetchUserProfile
