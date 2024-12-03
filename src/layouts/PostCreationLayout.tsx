import { Outlet } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import { useModal } from '../hooks/useModal'
import { usePostContext } from '../features/posts/contexts/PostContext'
import ModalSaveDialog from '../features/posts/components/post-creation/modal-forms/ModalSaveDialog'
import { useNavigateBackwards } from '../hooks/useNavigateBackwards'

export const PostCreationLayout = () => {
  const {
    formState: { isDirty },
    createDraft,
  } = usePostContext()!
  const { visible: mainModalVisible } = useModal(true)
  const {
    visible: saveDialogVisible,
    show: showSaveDialog,
    close: closeSaveDialog,
  } = useModal(false)
  const navBack = useNavigateBackwards()

  const handleMainModalClose = () => {
    if (isDirty) {
      showSaveDialog()
    } else {
      navBack()
    }
  }

  const handleDraftSave = () => {
    createDraft()
    navBack()
  }

  return (
    <Modal isOpen={mainModalVisible} onClose={handleMainModalClose}>
      <Outlet />
      <ModalSaveDialog
        onSave={handleDraftSave}
        isOpen={saveDialogVisible}
        onClose={closeSaveDialog}
        onDiscard={() => navBack()}
      />
    </Modal>
  )
}
