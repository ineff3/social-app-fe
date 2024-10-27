import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'

const useFetchUserProfile = (username: string) => {
  const queryKeyStore = useQueryKeyStore()
  return useQuery({
    ...queryKeyStore.users.detail(username),
    staleTime: Infinity,
  })
}

export default useFetchUserProfile
