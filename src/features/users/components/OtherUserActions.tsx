import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'

interface Props {
  isFollowing: boolean
  followeeId: string
}

export const OtherUserActions = ({ isFollowing, followeeId }: Props) => {
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
      className=" btn btn-outline btn-secondary btn-md"
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
