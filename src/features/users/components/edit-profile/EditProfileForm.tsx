import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SchemaUserResponseDto } from '@/src/generated/schema'
import { EditProfileFormType, editProfileValidationSchema } from '../../schemas'
import { EditProfileFormFields } from './EditProfileFormFields'
import {
  ComponentWithCloseProps,
  ComponentWithScrollRef,
} from '@/src/common/props'
import { useEditProfile } from '../../hooks/useEditProfile'
import { EditProfileHeader } from './EditProfileHeader'
import { useState } from 'react'

interface Props extends ComponentWithCloseProps, ComponentWithScrollRef {
  user: SchemaUserResponseDto
}

export const EditProfileForm = ({
  user: {
    firstName,
    secondName,
    bio,
    location,
    link,
    profileUrl,
    backgroundUrl,
  },
  onClose,
  scrollElementRef,
}: Props) => {
  const [isProfilePicUploading, setIsProfilePicUploading] = useState(false)
  const [isBackgroundPicUploading, setIsBackgroundPicUploading] =
    useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    control,
    getValues,
  } = useForm<EditProfileFormType>({
    defaultValues: {
      profileImage: null,
      backgroundImage: null,
      firstName,
      secondName,
      bio: bio ?? '',
      location: location ?? '',
      link: link ?? '',
    },
    resolver: zodResolver(editProfileValidationSchema),
  })
  const editProfileMutation = useEditProfile()

  const onSubmit: SubmitHandler<EditProfileFormType> = (data) => {
    if (!isDirty) {
      onClose()
      return
    }

    const { profileImage, backgroundImage, ...rest } = data

    editProfileMutation.mutate({
      ...rest,
      profileImageKey: profileImage?.imageKey,
      backgroundImageKey: backgroundImage?.imageKey,
    })
    onClose()
  }

  return (
    <form className=" flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <EditProfileHeader
        onClose={onClose}
        scrollElementRef={scrollElementRef}
        isDisabled={isProfilePicUploading || isBackgroundPicUploading}
      />
      <EditProfileFormFields
        control={control}
        register={register}
        errors={errors}
        getValues={getValues}
        profilePictureUrl={profileUrl}
        backgroundPictureUrl={backgroundUrl}
        isProfilePicUploading={isProfilePicUploading}
        isBackgroundPicUploading={isBackgroundPicUploading}
        setIsProfilePicUploading={setIsProfilePicUploading}
        setIsBackgroundPicUploading={setIsBackgroundPicUploading}
      />
    </form>
  )
}
