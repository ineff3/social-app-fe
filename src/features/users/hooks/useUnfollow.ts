import { apiRoutes } from '@/src/routes'
import { usePost } from '@/src/utils/api/mutations'
import { FollowMutationProps } from '../interfaces'

export const useUnfollow = ({
  followeeId,
  qKey,
  updater,
  shouldInvalidate,
}: FollowMutationProps) => {
  return usePost({
    path: apiRoutes.unfollow(followeeId),
    qKey,
    updater,
    shouldInvalidate,
  })
}
