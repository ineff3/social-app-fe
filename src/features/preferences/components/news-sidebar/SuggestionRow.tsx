import { FollowButton } from '@/src/features/users/components/FollowButton'
import { FollowMutationProps } from '@/src/features/users/interfaces'
import { UserPreview } from '@/src/layouts/components/UserPreview'
import {
  SchemaUserPreviewResponseDto,
  SchemaUserSuggestionsResponseDto,
} from '@/src/types/schema'
import { handleUpdater } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { InfiniteData } from '@tanstack/react-query'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

export const SuggestionRow = ({ userPreview }: Props) => {
  const followeeId = userPreview.id
  const queryKeyStore = useQueryKeyStore()

  const followProps: FollowMutationProps<
    InfiniteData<SchemaUserSuggestionsResponseDto>
  > = {
    followeeId,
    qKey: queryKeyStore.users.suggestions({}).queryKey,
    updater: handleUpdater(followeeId, { isFollowing: true }),
    shouldInvalidate: false,
  }

  const unfollowProps: FollowMutationProps<
    InfiniteData<SchemaUserSuggestionsResponseDto>
  > = {
    followeeId,
    qKey: queryKeyStore.users.suggestions({}).queryKey,
    updater: handleUpdater(followeeId, { isFollowing: false }),
    shouldInvalidate: false,
  }

  return (
    <div className=" flex items-center justify-between py-3">
      <UserPreview user={userPreview} />
      <FollowButton
        isFollowing={userPreview.isFollowing}
        size="sm"
        followProps={followProps}
        unfollowProps={unfollowProps}
      />
    </div>
  )
}
