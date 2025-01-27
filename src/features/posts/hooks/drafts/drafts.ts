import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import useGetUserPosts from '../useGetUserPosts'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import {
  useDeleteMultiple,
  usePost,
  useUpdate,
} from '@/src/utils/api/mutations'
import { apiRoutes } from '@/src/routes'
import { InfiniteData } from '@tanstack/react-query'
import {
  SchemaCreatePostDto,
  SchemaGetAllPostsResponseDto,
} from '@/src/generated/schema'

export const useGetDrafts = () => {
  const user = useAppSelector(selectUserPreview)!
  return useGetUserPosts({
    query: { limit: 20 },
    userId: user?.id,
    isDraft: true,
  })
}

export const useCreateDraft = () => {
  const queryKeyStore = useQueryKeyStore()
  const user = useAppSelector(selectUserPreview)!
  return usePost<null, SchemaCreatePostDto>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
  })
}

export const useUpdateDraft = (id: string) => {
  const queryKeyStore = useQueryKeyStore()
  const user = useAppSelector(selectUserPreview)!
  return useUpdate({
    path: apiRoutes.updatePost(id),
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
  })
}

export const useDeleteMultipleDrafts = () => {
  const queryKeyStore = useQueryKeyStore()
  const user = useAppSelector(selectUserPreview)!

  return useDeleteMultiple<InfiniteData<SchemaGetAllPostsResponseDto>>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
    updater: (oldData, draftIds) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: page.data.filter((draft) => !draftIds.value.includes(draft.id)),
        })),
      }
    },
  })
}
