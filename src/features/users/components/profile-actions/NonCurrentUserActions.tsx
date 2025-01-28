import { FollowButton } from '../FollowButton'

interface Props {
  isFollowing: boolean
  followeeId: string
  followeeUsername: string
}

export const NonCurrentUserActions = ({
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
