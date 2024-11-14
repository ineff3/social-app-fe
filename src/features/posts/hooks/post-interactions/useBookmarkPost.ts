import { apiRoutes } from '@/src/routes'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData } from '@tanstack/react-query'

const useBookmarkPost = (postId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<InfiniteData<SchemaGetAllPostsResponseDto>, void>({
    path: apiRoutes.bookmarkPost(postId),
    qKey: queryKeyStore.posts.all({}).queryKey,
    updater: (oldData) => {
      if (!oldData) return oldData

      const updatedPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.map((post) =>
          post.id == postId
            ? { ...post, isBookmarked: !post.isBookmarked }
            : post,
        ),
      }))

      return {
        ...oldData,
        pages: updatedPages,
      }
    },
  })
}

export default useBookmarkPost
