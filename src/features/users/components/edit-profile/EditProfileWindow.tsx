import StickyHeader from './StickyHeader'
import { useRef } from 'react'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useQueryClient } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { SchemaGetUserByUsernameResponseDto } from '@/src/generated/schema'
import { EditProfileForm } from './EditProfileForm'
interface Props {
  close: () => void
}

const EditProfileWindow = ({ close }: Props) => {
  const formRef = useRef<HTMLButtonElement | null>(null)
  const username = useAppSelector(selectUserPreview)!.username

  const queryClient = useQueryClient()
  const queryKeyStore = useQueryKeyStore()

  const profileData: SchemaGetUserByUsernameResponseDto | undefined =
    queryClient.getQueryData(queryKeyStore.users.detail(username).queryKey)

  const triggerFormSubmit = () => {
    if (formRef) {
      formRef.current?.click()
    }
  }

  return (
    <div className=" flex w-full flex-col">
      <StickyHeader close={close} onSave={triggerFormSubmit} />
      {profileData && (
        <EditProfileForm user={profileData.user} ref={formRef} close={close} />
      )}
    </div>
  )
}

export default EditProfileWindow
