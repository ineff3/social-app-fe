import { InfiniteData } from '@tanstack/react-query'
import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useDelete } from '@/src/utils/api/mutations'
import { apiRoutes } from '@/src/routes'

const useDeletePost = (hasDeletePermission?: boolean) => {
  const queryKeyStore = useQueryKeyStore()
  return useDelete<InfiniteData<SchemaGetAllPostsResponseDto>, string>({
    path: hasDeletePermission ? apiRoutes.admin.posts : apiRoutes.posts,
    qKey: queryKeyStore.posts._def,
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
