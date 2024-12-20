import { PostFormContent } from './PostFormContent'
import { PostFormFooter } from './PostFormFooter'
import ModalSaveDialog from './modal-forms/ModalSaveDialog'
import { CloseBtn } from '@/src/components/ui/CloseBtn'
import { usePostModalActions } from '../../hooks/usePostModalActions'
import { usePostContext } from '../../contexts/PostContext'
import useCreatePost from '../../hooks/useCreatePost'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { constructPostFormData } from '../../utils/constructPostFormData'
import { useState } from 'react'

export const CreatePostPage = () => {
  const { handleSubmit } = usePostContext()!
  const [creationError, setCreationError] = useState<string | null>(null)
  const createPostMutation = useCreatePost()
  const navigate = useNavigate()
  const {
    saveDialogVisible,
    handleDraftClick,
    handleMainModalClose,
    handleDraftSave,
    closeSaveDialog,
    modalSaveDialogDiscard,
  } = usePostModalActions()

  const submitForm = handleSubmit((data) => {
    console.log(1)
    const formData = constructPostFormData(data)

    createPostMutation.mutate(formData, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          setCreationError(
            error.response?.data?.message || 'Something went wrong',
          )
        }
      },
      onSuccess: () => {
        navigate(-1)
      },
    })
  })

  return (
    <>
      <form onSubmit={submitForm} className=" flex min-h-[350px] flex-col ">
        <div className=" mb-5 flex items-center justify-between">
          <CloseBtn onClick={handleMainModalClose} />
          <button
            type="button"
            className=" btn btn-ghost text-base text-primary"
            onClick={handleDraftClick}
          >
            Drafts
          </button>
        </div>
        <PostFormContent />
        <PostFormFooter
          creationError={creationError}
          isCreationPending={createPostMutation.isPending}
        />
      </form>
      <ModalSaveDialog
        isOpen={saveDialogVisible}
        onSave={handleDraftSave}
        onClose={closeSaveDialog}
        onDiscard={modalSaveDialogDiscard}
      />
    </>
  )
}
