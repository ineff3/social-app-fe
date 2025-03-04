import { PostFormContent } from './PostFormContent'
import { PostFormFooter } from './PostFormFooter'
import ModalSaveDialog from './modal-forms/ModalSaveDialog'
import { usePostModalActions } from '../../hooks/usePostModalActions'
import { usePostContext } from '../../contexts/PostContext'
import useCreatePost from '../../hooks/useCreatePost'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CloseCircleButton } from '@/src/components/ui/buttons/CloseCircleButton'
import { transformPostCreationData } from '../../utils/transformPostCreationData'
import { Helmet } from 'react-helmet-async'

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
    const transformedData = transformPostCreationData(data)
    createPostMutation.mutate(transformedData, {
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
      <Helmet>
        <title>Create a Post | Linker</title>
        <meta
          name="description"
          content="Share your thoughts with the world by creating a post on Linker."
        />
        <meta property="og:title" content="Create a Post | Linker" />
        <meta
          property="og:description"
          content="Express yourself and share your opinions with the Linker community."
        />
      </Helmet>

      <form onSubmit={submitForm} className=" flex min-h-[350px] flex-col ">
        <div className=" mb-5 flex items-center justify-between">
          <CloseCircleButton onClick={handleMainModalClose} />
          <button
            type="button"
            className=" btn btn-ghost text-base text-primary"
            onClick={handleDraftClick}
          >
            Drafts
          </button>
        </div>
        <PostFormContent placeholder="What is happening?" />
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
