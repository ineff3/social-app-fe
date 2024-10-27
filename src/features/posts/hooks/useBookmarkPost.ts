import { InfiniteData } from '@tanstack/react-query'
import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/queries'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'

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
