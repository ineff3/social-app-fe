import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'
import { FollowMutationProps } from '../interfaces'

const btnSizes = {
  sm: 'btn-sm',
  md: 'btn-md',
}

interface Props {
  isFollowing: boolean
  size?: keyof typeof btnSizes
  followProps: FollowMutationProps
  unfollowProps: FollowMutationProps
}

export const FollowButton = ({
  isFollowing,
  size = 'md',
  followProps,
  unfollowProps,
}: Props) => {
  const followMutation = useFollow(followProps)
  const unfollowMutation = useUnfollow(unfollowProps)

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
