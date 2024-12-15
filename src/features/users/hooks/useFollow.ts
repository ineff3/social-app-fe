import { apiRoutes } from '@/src/routes'
import { usePost } from '@/src/utils/api/mutations'
import { FollowMutationProps } from '../interfaces'

export const useFollow = ({
  followeeId,
  qKey,
  updater,
  shouldInvalidate,
}: FollowMutationProps) => {
  return usePost({
    path: apiRoutes.follow(followeeId),
    qKey,
    updater,
    shouldInvalidate,
  })
}
