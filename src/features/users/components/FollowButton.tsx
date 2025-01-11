import { useUpdateCache } from '@/src/utils/api/mutations'
import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { handleUpdater } from '@/src/utils/api/helpers'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'

const btnSizes = {
  sm: 'btn-sm',
  md: 'btn-md',
}

interface Props {
  isFollowing: boolean
  size?: keyof typeof btnSizes
  followeeId: string
  username: string
}

export const FollowButton = ({
  isFollowing,
  size = 'md',
  followeeId,
  username,
}: Props) => {
  const queryKeyStore = useQueryKeyStore()
  const followMutation = useFollow({ followeeId, username })
  const unfollowMutation = useUnfollow({ followeeId, username })

  const updateFollowCache = useUpdateCache(
    queryKeyStore.users.suggestions({}).queryKey,
    handleUpdater<SchemaUserPreviewResponseDto>(followeeId, (userPreview) => ({
      ...userPreview,
      isFollowing: true,
    })),
  )
  const updateUnfollowCache = useUpdateCache(
    queryKeyStore.users.suggestions({}).queryKey,
    handleUpdater<SchemaUserPreviewResponseDto>(followeeId, (userPreview) => ({
      ...userPreview,
      isFollowing: false,
    })),
  )

  return (
    <button
      onClick={() => {
        if (isFollowing) {
          updateUnfollowCache()
          unfollowMutation.mutate()
        } else {
          updateFollowCache()
          followMutation.mutate()
        }
      }}
      className={` btn btn-outline btn-secondary ${btnSizes[size]}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
