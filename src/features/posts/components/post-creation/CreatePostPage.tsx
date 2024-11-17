import { useLocation, useNavigate } from 'react-router-dom'
import { usePostContext } from '../../contexts/PostContext'
import { PostFormContent } from './PostFormContent'
import { PostFormFooter } from './PostFormFooter'
import ModalSaveDialog from './modal-forms/ModalSaveDialog'
import { useModal } from '@/src/hooks/useModal'
import { pageRoutes } from '@/src/routes'
import { CloseBtn } from '@/src/components/ui/CloseBtn'
import { useNavigateBackwards } from '@/src/hooks/useNavigateBackwards'
import { useState } from 'react'

type ExitMode = 'complete' | 'drafts'
export const CreatePostPage = () => {
  const [exitMode, setExitMode] = useState<ExitMode | null>(null)
  const { submitForm, isDirty, createDraft, reset } = usePostContext()!
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
  const modalSaveDialogDiscard = () => {
    if (exitMode === 'complete') {
      navBack()
    } else if (exitMode === 'drafts') {
      navigateToDrafts()
      reset()
    }
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
      setExitMode('drafts')
      showSaveDialog()
    } else {
      navigateToDrafts()
    }
  }

  const handleMainModalClose = () => {
    if (isDirty) {
      setExitMode('complete')
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
        onDiscard={modalSaveDialogDiscard}
      />
    </>
  )
}
