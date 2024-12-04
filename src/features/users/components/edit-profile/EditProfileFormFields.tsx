import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import { EditProfileFormType } from '../../schemas'
import ImageFileDropzone from '@/src/components/form/ImageFileDropzone'
import { FaUserCircle } from 'react-icons/fa'
import Input from '@/src/components/form/Input'
import Textarea from '@/src/components/form/Textarea'

interface FormFieldProps {
  control: Control<EditProfileFormType>
  register: UseFormRegister<EditProfileFormType>
  errors: FieldErrors<EditProfileFormType>
}

export const EditProfileFormFields = ({
  control,
  register,
  errors,
}: FormFieldProps) => {
  return (
    <div className=" relative -top-[45px] mx-auto flex w-full max-w-screen-md flex-col gap-2">
      <div className=" px-8">
        <div className=" h-[90px] w-[90px] overflow-hidden rounded-full">
          <Controller
            control={control}
            name="userImage"
            render={({ field }) => (
              <ImageFileDropzone
                onChange={field.onChange}
                value={field.value}
                icon={FaUserCircle}
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
    </div>
  )
}
