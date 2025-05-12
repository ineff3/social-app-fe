import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { pageRoutes } from '../../../../../routes'
import { EditProfileDropzone } from '@/src/features/users/components/edit-profile/EditProfileDropzone'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'
import { EditProfilePicture } from '@/src/features/users/schemas'
import { useUpdateProfileImage } from '../../../hooks/useUpdateProfileImage'
import { Spinner } from '@/src/components/ui/spinners/Spinner'

interface FormType {
  profileImage: EditProfilePicture | null
}

export const PhotoForm = () => {
  const [isPicUploading, setIsPicUploading] = useState(false)
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = useForm<FormType>({
    defaultValues: {
      profileImage: null,
    },
  })
  const updateProfileImage = useUpdateProfileImage()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const profileImageKey = data?.profileImage?.imageKey
    if (profileImageKey) {
      updateProfileImage.mutate({ profileImageKey })
    }
    navigate(pageRoutes.home)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-1 flex-col">
      <div className=" flex  w-full flex-1 justify-center">
        <div className="h-[150px] w-[150px] overflow-hidden rounded-full">
          <Controller
            control={control}
            name="profileImage"
            render={({ field: { onChange, value } }) => (
              <EditProfileDropzone
                onChange={onChange}
                value={value}
                name="profileImage"
                getValues={getValues}
                placeholderContent={
                  <div className="h-full w-full bg-base-300">
                    <FaUserCircle size="100%" />
                  </div>
                }
                isImageUploading={isPicUploading}
                setIsImageUploading={setIsPicUploading}
                imageType="avatar"
              />
            )}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`btn ${!isDirty ? ' btn-accent' : 'btn-primary'} ${isPicUploading && ' btn-disabled !bg-base-200'}`}
      >
        {isPicUploading && (
          <span>
            <Spinner />
          </span>
        )}
        <span>{!isDirty ? <>Skip for now</> : <>Next</>}</span>
      </button>
    </form>
  )
}
