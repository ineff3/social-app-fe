import { InfiniteData } from '@tanstack/react-query'
import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import useQueryKeyStore from '../../../utils/api/hooks/useQueryKeyStore'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'

const useLikePost = (postId: string) => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<InfiniteData<SchemaGetAllPostsResponseDto>, void>({
    path: apiRoutes.likePost(postId),
    qKey: queryKeyStore.posts.all({}).queryKey,
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
