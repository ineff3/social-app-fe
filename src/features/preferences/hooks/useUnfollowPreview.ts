import { apiRoutes } from '@/src/routes'
import { SchemaUserSuggestionsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData } from '@tanstack/react-query'

export const useUnfollowPreview = (followeeId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<InfiniteData<SchemaUserSuggestionsResponseDto>, void>({
    path: apiRoutes.unfollow(followeeId),
    qKey: queryKeyStore.users.suggestions({}).queryKey,
    updater: (oldData) => {
      if (!oldData) return oldData

      const updatedPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((userPreview) =>
          followeeId === userPreview.id
            ? { ...userPreview, isFollowing: false }
            : userPreview,
        ),
      }))
      console.log(updatedPages)

      return {
        ...oldData,
        pages: updatedPages,
      }
    },
    shouldInvalidate: false,
  })
}
