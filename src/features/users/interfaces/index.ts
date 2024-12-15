import { QueryKey } from '@tanstack/react-query'

export interface FollowMutationProps<T> {
  followeeId: string
  qKey: QueryKey
  updater?: (oldData: T) => T
  shouldInvalidate?: boolean
}
