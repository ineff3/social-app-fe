import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'
import { FollowButton } from './FollowButton'

interface Props {
  isFollowing: boolean
  followeeId: string
}

export const OtherUserActions = ({ isFollowing, followeeId }: Props) => {
  return (
    <FollowButton
      isFollowing={isFollowing}
      followeeId={followeeId}
      useFollow={useFollow}
      useUnfollow={useUnfollow}
    />
  )
}
