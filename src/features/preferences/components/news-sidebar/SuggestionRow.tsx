import { FollowButton } from '@/src/features/users/components/FollowButton'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

// TODO: onFollow should update cache but not invalidate query
export const SuggestionRow = ({ userPreview }: Props) => {
  return (
    <div className=" flex items-center justify-between py-3">
      <UserPreview user={userPreview} />
      <FollowButton
        followeeId={userPreview.id}
        isFollowing={userPreview.isFollowing}
        size="sm"
      />
    </div>
  )
}
