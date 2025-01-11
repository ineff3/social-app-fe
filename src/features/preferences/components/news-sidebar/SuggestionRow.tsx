import { FollowButton } from '@/src/features/users/components/FollowButton'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'
import { useNavigate } from 'react-router-dom'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

export const SuggestionRow = ({ userPreview }: Props) => {
  const navigate = useNavigate()

  const handleProfileRedirect = (e: React.MouseEvent) => {
    const isInteractiveElement = (e.target as HTMLElement).closest('button')

    if (!isInteractiveElement) {
      navigate(`/users/${userPreview.username}`)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleProfileRedirect}
      className=" flex items-center justify-between px-4 py-3"
    >
      <UserPreview user={userPreview} disabledLink={true} />
      <FollowButton
        isFollowing={userPreview.isFollowing}
        size="sm"
        followeeId={userPreview.id}
        username={userPreview.username}
      />
    </div>
  )
}
