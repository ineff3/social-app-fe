import { useModal } from '@/src/hooks/useModal'
import EditProfileWindow from './edit-profile/EditProfileWindow'
import Modal from '@/src/components/ui/Modal'

export const CurrentUserActions = () => {
  const { show, close, visible } = useModal()

  return (
    <>
      <button className=" btn btn-outline btn-secondary  btn-md" onClick={show}>
        Edit profile
      </button>
      <Modal isOpen={visible} onClose={close} hasPadding={false}>
        <EditProfileWindow close={close} />
      </Modal>
    </>
  )
}
