import { apiRoutes } from '@/src/routes'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import { QueryUpdater } from '@/src/utils/api/interfaces'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData, QueryKey } from '@tanstack/react-query'

const useBookmarkPost = (
  postId: string,
  qKey: QueryKey,
  updater?: QueryUpdater,
) => {
  const defaultUpdater = (
    oldData: InfiniteData<SchemaGetAllPostsResponseDto>,
  ) => {
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
  }

  return usePost<InfiniteData<SchemaGetAllPostsResponseDto>, void>({
    path: apiRoutes.bookmarkPost(postId),
    qKey,
    updater: updater ?? defaultUpdater,
  })
}

export default useBookmarkPost
