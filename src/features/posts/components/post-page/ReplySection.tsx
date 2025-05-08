import { useState } from 'react'
import useCreatePost from '../../hooks/useCreatePost'
import { PostFormContent } from '../post-creation/PostFormContent'
import { PostFormFooter } from '../post-creation/PostFormFooter'
import { usePostContext } from '../../contexts/PostContext'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { transformPostCreationData } from '../../utils/transformPostCreationData'

interface Props {
  parentPostId: string
}

export const ReplySection = ({ parentPostId }: Props) => {
  const [isReplyMinimized, setIsReplyMinimized] = useState<boolean>(true)
  const { handleSubmit, reset } = usePostContext()!
  const [creationError, setCreationError] = useState<string | null>(null)
  const createPostMutation = useCreatePost()
  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const submitForm = handleSubmit((data) => {
    const transformedData = transformPostCreationData(data)
    createPostMutation.mutate(
      { ...transformedData, parentPostId },
      {
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
      },
    )
  })
  return (
    <form onSubmit={submitForm}>
      <div className="flex gap-5">
        <div className=" w-full" onClick={() => setIsReplyMinimized(false)}>
          <PostFormContent
            placeholder="Post your reply"
            isTextEditorMinimized={isReplyMinimized}
          />
        </div>
        {isReplyMinimized && (
          <button
            disabled
            className=" btn btn-disabled btn-primary btn-sm mt-2 !bg-base-200"
          >
            Reply
          </button>
        )}
      </div>
      {!isReplyMinimized && (
        <div className="pl-14 pt-3">
          <PostFormFooter
            hasDivider={false}
            submitBtnTitle="Reply"
            creationError={creationError}
            isCreationPending={createPostMutation.isPending}
          />
        </div>
      )}
    </form>
  )
}
