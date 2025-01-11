import { apiRoutes } from '@/src/routes'
import { usePost } from '@/src/utils/api/mutations'
import { FollowMutationProps } from '../interfaces'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { SchemaGetUserByUsernameResponseDto } from '@/src/generated/schema'

export const useUnfollow = ({ followeeId, username }: FollowMutationProps) => {
  const queryKeyStore = useQueryKeyStore()

  return usePost<SchemaGetUserByUsernameResponseDto, void>({
    path: apiRoutes.unfollow(followeeId),
    qKey: queryKeyStore.users.detail(username).queryKey,
    updater: (oldData) => {
      return { ...oldData, isFollowing: false }
    },
  })
}
