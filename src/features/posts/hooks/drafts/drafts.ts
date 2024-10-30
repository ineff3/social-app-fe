import useQueryKeyStore from '@/src/utils/api/useQueryKeyStore'
import {
  useDelete,
  useDeleteMultiple,
  usePost,
} from '../../../../utils/api/queries'
import { apiRoutes } from '../../../../routes'
import { IDraft } from '../../interfaces'
import { IUserPreview } from '@/src/features/authentication/interfaces'
import { useQueryClient } from '@tanstack/react-query'
import useGetUserPosts from '../useGetUserPosts'

export const useGetDrafts = () => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const user = queryClient.getQueryData(
    queryKeyStore.users.currentUserPreview.queryKey,
  ) as IUserPreview
  return useGetUserPosts({
    query: { limit: 20 },
    userId: user.id,
    isDraft: true,
  })
}

export const useCreateDraft = () => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const user = queryClient.getQueryData(
    queryKeyStore.users.currentUserPreview.queryKey,
  ) as IUserPreview
  return usePost({
    path: apiRoutes.drafts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user.id, true).queryKey,
    axiosOptions: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  })
}

export const useDeleteDraft = () => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const user = queryClient.getQueryData(
    queryKeyStore.users.currentUserPreview.queryKey,
  ) as IUserPreview
  return useDelete<IDraft[], string>({
    path: apiRoutes.drafts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user.id, true).queryKey,
    updater: (oldData, draftId) => [
      ...oldData.filter((draft) => draft._id !== String(draftId)),
    ],
  })
}

export const useDeleteMultipleDrafts = () => {
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()
  const user = queryClient.getQueryData(
    queryKeyStore.users.currentUserPreview.queryKey,
  ) as IUserPreview
  return useDeleteMultiple<IDraft[]>({
    path: apiRoutes.drafts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user.id, true).queryKey,
    updater: (oldData, draftIds) => [
      ...oldData.filter((draft) => !draftIds.value.includes(draft._id)),
    ],
  })
}
