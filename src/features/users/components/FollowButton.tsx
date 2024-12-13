import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'

const btnSizes = {
  sm: 'btn-sm',
  md: 'btn-md',
}

interface Props {
  isFollowing: boolean
  followeeId: string
  size: keyof typeof btnSizes
}

export const FollowButton = ({
  isFollowing,
  followeeId,
  size = 'md',
}: Props) => {
  const followMutation = useFollow(followeeId)
  const unfollowMutation = useUnfollow(followeeId)

  return (
    <button
      onClick={() => {
        if (isFollowing) {
          unfollowMutation.mutate({})
        } else {
          followMutation.mutate({})
        }
      }}
      className={` btn btn-outline btn-secondary ${btnSizes[size]}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
