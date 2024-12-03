import { usePostContext } from '../../contexts/PostContext'
import { PostFormContent } from './PostFormContent'
import { PostFormFooter } from './PostFormFooter'
import ModalSaveDialog from './modal-forms/ModalSaveDialog'
import { CloseBtn } from '@/src/components/ui/CloseBtn'
import { usePostModalActions } from '../../hooks/usePostModalActions'

export const CreatePostPage = () => {
  const { submitForm } = usePostContext()!
  const {
    saveDialogVisible,
    handleDraftClick,
    handleMainModalClose,
    handleDraftSave,
    closeSaveDialog,
    modalSaveDialogDiscard,
  } = usePostModalActions()

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
        <PostFormFooter />
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
