import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'

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
  const followMutation = useFollow(followeeId, followeeUsername)
  const unfollowMutation = useUnfollow(followeeId, followeeUsername)

  return (
    <button
      onClick={() => {
        if (isFollowing) {
          unfollowMutation.mutate({})
        } else {
          followMutation.mutate({})
        }
      }}
      className=" btn btn-outline btn-secondary btn-md"
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
