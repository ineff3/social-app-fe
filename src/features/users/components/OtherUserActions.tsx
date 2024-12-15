import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { FollowButton } from './FollowButton'
import { FollowMutationProps } from '../interfaces'

interface Props {
  isFollowing: boolean
  followeeId: string
  followeeUsername: string
}

export const OtherUserActions = ({
  isFollowing,
  followeeId,
  followeeUsername,
}: Props) => {
  const queryKeyStore = useQueryKeyStore()
  const followProps: FollowMutationProps = {
    followeeId,
    qKey: queryKeyStore.users.detail(followeeUsername).queryKey,
    updater: (oldData) => {
      return { ...oldData, isFollowing: true }
    },
  }

  const unfollowProps: FollowMutationProps = {
    followeeId,
    qKey: queryKeyStore.users.detail(followeeUsername).queryKey,
    updater: (oldData) => {
      return { ...oldData, isFollowing: false }
    },
  }
  return (
    <FollowButton
      isFollowing={isFollowing}
      followProps={followProps}
      unfollowProps={unfollowProps}
    />
  )
}
