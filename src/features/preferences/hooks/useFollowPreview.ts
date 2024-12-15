import { apiRoutes } from '@/src/routes'
import { SchemaUserSuggestionsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData } from '@tanstack/react-query'

export const useFollowPreview = (followeeId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<InfiniteData<SchemaUserSuggestionsResponseDto>, void>({
    path: apiRoutes.follow(followeeId),
    qKey: queryKeyStore.users.suggestions({}).queryKey,
    updater: (oldData) => {
      if (!oldData) return oldData

      const updatedPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((userPreview) =>
          followeeId === userPreview.id
            ? { ...userPreview, isFollowing: true }
            : userPreview,
        ),
      }))

      return {
        ...oldData,
        pages: updatedPages,
      }
    },
    shouldInvalidate: false,
  })
}
