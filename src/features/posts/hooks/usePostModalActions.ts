import { useModal } from '@/src/hooks/useModal'
import { useNavigateBackwards } from '@/src/hooks/useNavigateBackwards'
import { pageRoutes } from '@/src/routes'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePostContext } from '../contexts/PostContext'

type ExitMode = 'complete' | 'drafts'

export const usePostModalActions = () => {
  const [exitMode, setExitMode] = useState<ExitMode | null>(null)
  const {
    visible: saveDialogVisible,
    show: showSaveDialog,
    close: closeSaveDialog,
  } = useModal()
  const {
    formState: { isDirty },
    createDraft,
    reset,
  } = usePostContext()!
  const location = useLocation()
  const state = location.state as {
    backgroundLocation?: Location
  }
  const backgroundLocation = state?.backgroundLocation ?? pageRoutes.home
  const navigate = useNavigate()
  const navBack = useNavigateBackwards()

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

  return {
    saveDialogVisible,
    closeSaveDialog,
    modalSaveDialogDiscard,
    handleDraftSave,
    handleDraftClick,
    handleMainModalClose,
  }
}
