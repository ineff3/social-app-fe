import { InfiniteData } from '@tanstack/react-query'
import { apiRoutes } from '../../../routes'
import { useDelete } from '../../../utils/api/queries'
import useQueryKeyStore from '../../../utils/api/useQueryKeyStore'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'

const useDeletePost = () => {
  const queryKeyStore = useQueryKeyStore()
  return useDelete<InfiniteData<SchemaGetAllPostsResponseDto>, string>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({}).queryKey,
    updater: (oldData, deletedPostId) => {
      if (!oldData) return oldData

      const updatedPages = oldData.pages.map((page) => ({
        ...page,
        data: page.data.filter((post) => post.id !== deletedPostId),
      }))

      return {
        ...oldData,
        pages: updatedPages,
      }
    },
  })
}

export default useDeletePost
