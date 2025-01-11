import { apiRoutes } from '@/src/routes'
import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import { QueryUpdater } from '@/src/utils/api/interfaces'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData, QueryKey } from '@tanstack/react-query'

const useLikePost = (
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
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    }))

    return {
      ...oldData,
      pages: updatedPages,
    }
  }

  return usePost({
    path: apiRoutes.likePost(postId),
    qKey,
    updater: updater ?? defaultUpdater,
  })
}

export default useLikePost
