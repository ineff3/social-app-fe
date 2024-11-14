import { Outlet, useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import { useModal } from '../hooks/useModal'
import { usePostContext } from '../features/posts/contexts/PostContext'
import ModalSaveDialog from '../features/posts/components/post-creation/modal-forms/ModalSaveDialog'

export const PostCreationLayout = () => {
  const { isDirty, createDraft } = usePostContext()!
  const { visible: mainModalVisible } = useModal(true)
  const {
    visible: saveDialogVisible,
    show: showSaveDialog,
    close: closeSaveDialog,
  } = useModal(false)
  const navigate = useNavigate()

  const handleMainModalClose = () => {
    if (isDirty) {
      showSaveDialog()
    } else {
      navigate(-1)
    }
  }

  const handleDraftSave = () => {
    createDraft()
    navigate(-1)
  }

  return (
    <Modal isOpen={mainModalVisible} close={handleMainModalClose}>
      <Outlet />
      <ModalSaveDialog
        onSave={handleDraftSave}
        isOpen={saveDialogVisible}
        onClose={closeSaveDialog}
        onDiscard={() => navigate(-1)}
      />
    </Modal>
  )
}
