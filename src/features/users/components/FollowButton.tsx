import { UseMutationResult } from '@tanstack/react-query'

const btnSizes = {
  sm: 'btn-sm',
  md: 'btn-md',
}

interface Props {
  isFollowing: boolean
  followeeId: string
  size?: keyof typeof btnSizes
  useFollow: (followeeId: string) => UseMutationResult<void>
  useUnfollow: (followeeId: string) => UseMutationResult<void>
}

export const FollowButton = ({
  isFollowing,
  followeeId,
  size = 'md',
  useFollow,
  useUnfollow,
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
