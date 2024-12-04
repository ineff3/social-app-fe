import { useModal } from '@/src/hooks/useModal'
import EditProfileWindow from './edit-profile/EditProfileWindow'
import Modal from '@/src/components/ui/Modal'

interface Props {
  isCurrentUser: boolean
}

export const ProfileActions = ({ isCurrentUser }: Props) => {
  const { show, close, visible } = useModal()

  if (isCurrentUser) {
    return (
      <>
        <button className=" btn btn-outline btn-md" onClick={show}>
          Edit profile
        </button>
        <Modal isOpen={visible} onClose={close} hasPadding={false}>
          <EditProfileWindow close={close} />
        </Modal>
      </>
    )
  }
  return <button className=" btn btn-outline btn-md">Follow</button>
}
