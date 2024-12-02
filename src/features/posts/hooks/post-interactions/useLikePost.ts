import { apiRoutes } from '@/src/routes'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'
import { InfiniteData } from '@tanstack/react-query'

const useLikePost = (postId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<InfiniteData<SchemaGetAllPostsResponseDto>, void>({
    path: apiRoutes.likePost(postId),
    // qKey: queryKeyStore.posts.all({}).queryKey,
    qKey: queryKeyStore.posts._def, // TODO: refactor optimistic mutations
    updater: (oldData) => {
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
    },
  })
}

export default useLikePost
