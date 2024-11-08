import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import useGetUserPosts from '../useGetUserPosts'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import {
  useDelete,
  useDeleteMultiple,
  usePost,
} from '@/src/utils/api/mutations'
import { apiRoutes } from '@/src/routes'
import { IDraft } from '../../interfaces'

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
  return usePost({
    path: apiRoutes.drafts,
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
  return useDeleteMultiple<IDraft[]>({
    path: apiRoutes.drafts,
    qKey: queryKeyStore.posts.all({})._ctx.user(user?.id, true).queryKey,
    updater: (oldData, draftIds) => [
      ...oldData.filter((draft) => !draftIds.value.includes(draft._id)),
    ],
  })
}
