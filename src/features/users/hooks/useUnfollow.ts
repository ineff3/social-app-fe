import { apiRoutes } from '@/src/routes'
import { usePost } from '@/src/utils/api/mutations'
import { FollowMutationProps } from '../interfaces'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { SchemaGetUserByUsernameResponseDto } from '@/src/generated/schema'
import { useQueryClient } from '@tanstack/react-query'

export const useUnfollow = ({ followeeId, username }: FollowMutationProps) => {
  const queryKeyStore = useQueryKeyStore()
  const queryClient = useQueryClient()
  const qKey = queryKeyStore.users.detail(username).queryKey

  const hasOldData = queryClient.getQueryData(qKey)

  return usePost<SchemaGetUserByUsernameResponseDto, void>({
    path: apiRoutes.unfollow(followeeId),
    qKey: queryKeyStore.users.detail(username).queryKey,
    updater: hasOldData
      ? (oldData) => ({ ...oldData, isFollowing: false })
      : undefined,
  })
}
