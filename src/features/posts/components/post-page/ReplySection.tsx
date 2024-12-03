import { useState } from 'react'
import useCreatePost from '../../hooks/useCreatePost'
import { PostFormContent } from '../post-creation/PostFormContent'
import { PostFormFooter } from '../post-creation/PostFormFooter'
import { usePostContext } from '../../contexts/PostContext'
import { constructPostFormData } from '../../utils/constructPostFormData'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

interface Props {
  parentPostId: string
}

export const ReplySection = ({ parentPostId }: Props) => {
  const { handleSubmit, reset } = usePostContext()!
  const [creationError, setCreationError] = useState<string | null>(null)
  const createPostMutation = useCreatePost()
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const submitForm = handleSubmit((data) => {
    const formData = constructPostFormData(data)
    formData.append('parentPostId', parentPostId)
    createPostMutation.mutate(formData, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          setCreationError(
            error.response?.data?.message || 'Something went wrong',
          )
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.posts.detail(parentPostId)._ctx.comments()
            .queryKey,
        })
      },
      onSettled: () => {
        reset()
      },
    })
  })
  return (
    <form onSubmit={submitForm}>
      <PostFormContent />
      <div className="pl-14 pt-3">
        <PostFormFooter
          hasDivider={false}
          submitBtnTitle="Reply"
          creationError={creationError}
          isCreationPending={createPostMutation.isPending}
        />
      </div>
    </form>
  )
}
