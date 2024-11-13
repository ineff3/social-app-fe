import { useLocation, useNavigate } from 'react-router-dom'
import { usePostContext } from '../../contexts/PostContext'
import { PostFormContent } from './PostFormContent'
import CloseBtn from '@/src/components/ui/CloseBtn'
import { PostFormFooter } from './PostFormFooter'
import ModalSaveDialog from '../post-creation/ModalSaveDialog'
import { useModal } from '@/src/hooks/useModal'
import { pageRoutes } from '@/src/routes'

export const CreatePostPage = () => {
  const { submitForm, isDirty, createDraft } = usePostContext()!
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    backgroundLocation?: Location
  }
  const backgroundLocation = state?.backgroundLocation ?? pageRoutes.home
  const {
    visible: saveDialogVisible,
    show: showSaveDialog,
    close: closeSaveDialog,
  } = useModal()

  const handleDraftSave = () => {
    createDraft()
    navigate(pageRoutes.drafts, { state: { backgroundLocation } })
  }

  const handleDraftClick = () => {
    if (isDirty) {
      showSaveDialog()
    } else {
      navigate(pageRoutes.drafts, { state: { backgroundLocation } })
    }
  }

  const handleMainModalClose = () => {
    if (isDirty) {
      showSaveDialog()
    } else {
      navigate(-1)
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
        onDiscard={() =>
          navigate(pageRoutes.drafts, {
            state: { backgroundLocation },
          })
        }
      />
    </>
  )
}
