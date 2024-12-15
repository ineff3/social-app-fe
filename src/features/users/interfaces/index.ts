import { QueryKey } from '@tanstack/react-query'

export interface FollowMutationProps {
  followeeId: string
  qKey: QueryKey
  updater?: <T>(oldData: T) => T
  shouldInvalidate?: boolean
}
