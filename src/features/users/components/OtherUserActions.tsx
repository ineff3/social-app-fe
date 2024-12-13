import { FollowButton } from './FollowButton'

interface Props {
  isFollowing: boolean
  followeeId: string
}

export const OtherUserActions = ({ isFollowing, followeeId }: Props) => {
  return <FollowButton isFollowing={isFollowing} followeeId={followeeId} />
}
