import { FollowButton } from './FollowButton'

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
  return (
    <FollowButton
      isFollowing={isFollowing}
      followeeId={followeeId}
      username={followeeUsername}
    />
  )
}
