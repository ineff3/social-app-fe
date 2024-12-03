import { useState } from 'react'
import useCreatePost from '../../hooks/useCreatePost'
import { PostFormContent } from '../post-creation/PostFormContent'
import { PostFormFooter } from '../post-creation/PostFormFooter'
import { usePostContext } from '../../contexts/PostContext'
import { constructPostFormData } from '../../utils/constructPostFormData'
import { AxiosError } from 'axios'

interface Props {
  parentPostId: string
}

export const ReplySection = ({ parentPostId }: Props) => {
  const { handleSubmit } = usePostContext()!
  const [creationError, setCreationError] = useState<string | null>(null)
  const createPostMutation = useCreatePost()

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
    })
  })
  return (
    <form onSubmit={submitForm}>
      <PostFormContent />
      <div className="pl-14">
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
