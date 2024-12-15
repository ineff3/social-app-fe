import { FollowButton } from '@/src/features/users/components/FollowButton'
import { FollowMutationProps } from '@/src/features/users/interfaces'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'
import { handleUpdater } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useNavigate } from 'react-router-dom'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

export const SuggestionRow = ({ userPreview }: Props) => {
  const followeeId = userPreview.id
  const queryKeyStore = useQueryKeyStore()
  const navigate = useNavigate()

  const handleProfileRedirect = (e: React.MouseEvent) => {
    const isInteractiveElement = (e.target as HTMLElement).closest('button')

    if (!isInteractiveElement) {
      navigate(`/users/${userPreview.username}`)
    }
  }

  const followProps: FollowMutationProps = {
    followeeId,
    qKey: queryKeyStore.users.suggestions({}).queryKey,
    updater: handleUpdater(followeeId, { isFollowing: true }) as <T>(
      oldData: T,
    ) => T,
    shouldInvalidate: false,
  }

  const unfollowProps: FollowMutationProps = {
    followeeId,
    qKey: queryKeyStore.users.suggestions({}).queryKey,
    updater: handleUpdater(followeeId, { isFollowing: false }) as <T>(
      oldData: T,
    ) => T,
    shouldInvalidate: false,
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
        followProps={followProps}
        unfollowProps={unfollowProps}
      />
    </div>
  )
}
