import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import useGetUserPosts from '../useGetUserPosts'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import {
  useDelete,
  useDeleteMultiple,
  usePost,
  useUpdate,
} from '@/src/utils/api/mutations'
import { apiRoutes } from '@/src/routes'
import { IDraft } from '../../interfaces'
import { InfiniteData } from '@tanstack/react-query'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'

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
  return usePost<null, FormData>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
    axiosOptions: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  })
}

export const useUpdateDraft = (id: string) => {
  const queryKeyStore = useQueryKeyStore()
  const user = useAppSelector(selectUserPreview)!
  return useUpdate({
    path: apiRoutes.updatePost(id),
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
    axiosOptions: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  })
}

export const useDeleteDraft = () => {
  const queryKeyStore = useQueryKeyStore()
  const user = useAppSelector(selectUserPreview)!
  return useDelete<IDraft[], string>({
    path: apiRoutes.drafts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
    updater: (oldData, draftId) => [
      ...oldData.filter((draft) => draft._id !== String(draftId)),
    ],
  })
}

export const useDeleteMultipleDrafts = () => {
  const queryKeyStore = useQueryKeyStore()
  const user = useAppSelector(selectUserPreview)!

  return useDeleteMultiple<InfiniteData<SchemaGetAllPostsResponseDto>>({
    path: apiRoutes.posts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
    updater: (oldData, draftIds) => {
      if (!oldData) return oldData // Return early if oldData is undefined

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
