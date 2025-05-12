import { Control, Controller, FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { EditProfileFormType } from '../../schemas'
import Input from '@/src/components/form/Input'
import Textarea from '@/src/components/form/Textarea'
import { EditProfileDropzone } from './EditProfileDropzone'
import { FaUserCircle } from 'react-icons/fa'

interface Props {
  control: Control<EditProfileFormType>
  register: UseFormRegister<EditProfileFormType>
  errors: FieldErrors<EditProfileFormType>
  getValues: UseFormGetValues<EditProfileFormType>
  profilePictureUrl?: string | null
  backgroundPictureUrl?: string | null
  isProfilePicUploading: boolean
  isBackgroundPicUploading: boolean
  setIsProfilePicUploading: React.Dispatch<React.SetStateAction<boolean>>
  setIsBackgroundPicUploading: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfileFormFields = ({
  control,
  register,
  errors,
  getValues,
  profilePictureUrl,
  backgroundPictureUrl,
  isProfilePicUploading,
  isBackgroundPicUploading,
  setIsProfilePicUploading,
  setIsBackgroundPicUploading,
}: Props) => {
  return (
    <>
      <div className=" h-[190px]">
        <Controller
          control={control}
          name="backgroundImage"
          render={({ field: { onChange, value } }) => (
            <EditProfileDropzone
              onChange={onChange}
              value={value}
              name="backgroundImage"
              getValues={getValues}
              existingPictureUrl={backgroundPictureUrl}
              placeholderContent={<div className="h-full w-full bg-base-200"></div>}
              isImageUploading={isBackgroundPicUploading}
              setIsImageUploading={setIsBackgroundPicUploading}
              imageType="post"
            />
          )}
        />
      </div>
      <div className=" relative -top-[45px] mx-auto flex w-full max-w-screen-md flex-col gap-2 px-8">
        <div className=" h-[90px] w-[90px] overflow-hidden rounded-full">
          <Controller
            control={control}
            name="profileImage"
            render={({ field: { onChange, value } }) => (
              <EditProfileDropzone
                onChange={onChange}
                value={value}
                name="profileImage"
                existingPictureUrl={profilePictureUrl}
                getValues={getValues}
                placeholderContent={
                  <div className="h-full w-full bg-base-300">
                    <FaUserCircle size="100%" />
                  </div>
                }
                isImageUploading={isProfilePicUploading}
                setIsImageUploading={setIsProfilePicUploading}
                imageType="avatar"
              />
            )}
          />
        </div>
        <div className=" mt-5 flex flex-col">
          <Input
            {...register('firstName')}
            isInvalid={!!errors.firstName}
            errorMessage={errors?.firstName?.message}
            label="First Name"
            primaryBorder={false}
          />
          <Input
            {...register('secondName')}
            isInvalid={!!errors.secondName}
            errorMessage={errors?.secondName?.message}
            label="Second Name"
            primaryBorder={false}
          />

          <Textarea
            {...register('bio')}
            rows={3}
            isInvalid={!!errors.bio}
            errorMessage={errors?.bio?.message}
            label="Bio"
            primaryBorder={false}
          />
          <Input
            {...register('location')}
            isInvalid={!!errors.location}
            errorMessage={errors?.location?.message}
            label="Location"
            primaryBorder={false}
          />
          <Input
            {...register('link')}
            isInvalid={!!errors.link}
            errorMessage={errors?.link?.message}
            label="Link"
            primaryBorder={false}
          />
        </div>
      </div>
    </>
  )
}
