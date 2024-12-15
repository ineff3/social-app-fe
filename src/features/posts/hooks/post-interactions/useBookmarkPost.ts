import { apiRoutes } from '@/src/routes'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData, QueryKey } from '@tanstack/react-query'

const useBookmarkPost = (postId: string, qKey: QueryKey) => {
  return usePost<InfiniteData<SchemaGetAllPostsResponseDto>, void>({
    path: apiRoutes.bookmarkPost(postId),
    qKey,
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
