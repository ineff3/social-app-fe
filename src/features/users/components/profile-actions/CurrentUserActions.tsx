import { useModal } from '@/src/hooks/useModal'
import Modal from '@/src/components/ui/Modal'
import { useRef } from 'react'
import { SchemaUserResponseDto } from '@/src/generated/schema'
import { EditProfileForm } from '../edit-profile/EditProfileForm'

interface Props {
  user: SchemaUserResponseDto
}

export const CurrentUserActions = ({ user }: Props) => {
  const { show, close, visible } = useModal()
  const scrollElementRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <button className=" btn btn-outline btn-secondary btn-md" onClick={show}>
        Edit profile
      </button>
      <Modal
        isOpen={visible}
        onClose={close}
        hasPadding={false}
        ref={scrollElementRef}
      >
        <EditProfileForm
          user={user}
          scrollElementRef={scrollElementRef}
          onClose={close}
        />
      </Modal>
    </>
  )
}
