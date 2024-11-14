import { useLocation, useNavigate } from 'react-router-dom'
import { usePostContext } from '../../contexts/PostContext'
import { PostFormContent } from './PostFormContent'
import { PostFormFooter } from './PostFormFooter'
import ModalSaveDialog from './modal-forms/ModalSaveDialog'
import { useModal } from '@/src/hooks/useModal'
import { pageRoutes } from '@/src/routes'
import { CloseBtn } from '@/src/components/ui/CloseBtn'
import { useNavigateBackwards } from '@/src/hooks/useNavigateBackwards'

export const CreatePostPage = () => {
  const { submitForm, isDirty, createDraft } = usePostContext()!
  const navigate = useNavigate()
  const navBack = useNavigateBackwards()
  const location = useLocation()
  const state = location.state as {
    backgroundLocation?: Location
  }
  const backgroundLocation = state?.backgroundLocation ?? pageRoutes.home

  const navigateToDrafts = () => {
    navigate(pageRoutes.drafts, { state: { backgroundLocation } })
  }

  const {
    visible: saveDialogVisible,
    show: showSaveDialog,
    close: closeSaveDialog,
  } = useModal()

  const handleDraftSave = () => {
    createDraft()
    navigateToDrafts()
  }

  const handleDraftClick = () => {
    if (isDirty) {
      showSaveDialog()
    } else {
      navigateToDrafts()
    }
  }

  const handleMainModalClose = () => {
    if (isDirty) {
      showSaveDialog()
    } else {
      navBack()
    }
  }

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
        onDiscard={() => navigateToDrafts()}
      />
    </>
  )
}
