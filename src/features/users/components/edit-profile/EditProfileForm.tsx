import { SubmitHandler, useForm } from 'react-hook-form'
import { forwardRef, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { SchemaUserResponseDto } from '@/src/generated/schema'
import { EditProfileFormType, editProfileValidationSchema } from '../../schemas'
import { BackgroundImageSection } from './BackgroundImageSection'
import { EditProfileFormFields } from './EditProfileFormFields'
import useEditProfile from '../../hooks/useEditProfile'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import fetchImageAsFile from '@/src/utils/api/fetchImageAsFile'

interface Props {
  user: SchemaUserResponseDto
  close: () => void
}

export const EditProfileForm = forwardRef(
  (
    {
      user: {
        firstName,
        secondName,
        bio,
        location,
        link,
        avatarUrl,
        backgroundUrl,
        username,
      },
      close,
    }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const [isImageLoading, setIsImageLoading] = useState(true)
    const {
      handleSubmit,
      register,
      formState: { errors, isDirty },
      control,
      setValue,
    } = useForm<EditProfileFormType>({
      defaultValues: {
        userImage: [],
        backgroundImage: [],
        firstName,
        secondName,
        bio: bio ?? '',
        location: location ?? '',
        link: link ?? '',
      },
      resolver: zodResolver(editProfileValidationSchema),
    })
    const editProfileMutation = useEditProfile()
    const queryClient = useQueryClient()
    const queryKeyStore = useQueryKeyStore()

    // getting File objects for server images, to set initial form value
    useEffect(() => {
      const loadUserImageFile = async () => {
        if (avatarUrl) {
          const file = await fetchImageAsFile(avatarUrl, 'userImage')
          setValue('userImage', [file])
        }
      }
      const loadBackgroundImageFile = async () => {
        if (backgroundUrl) {
          const file = await fetchImageAsFile(backgroundUrl, 'backgroundImage')
          setValue('backgroundImage', [file])
        }
      }
      loadUserImageFile()
      loadBackgroundImageFile()
      setIsImageLoading(false)
    }, [avatarUrl, backgroundUrl, setValue])

    const onSubmit: SubmitHandler<EditProfileFormType> = (data) => {
      const formData = new FormData()
      if (!isDirty) {
        close()
        return
      }
      for (const [key, value] of Object.entries(data)) {
        if (key === 'userImage' || key === 'backgroundImage') {
          value.forEach((file: File) => formData.append(key, file))
        } else {
          formData.append(key, value)
        }
      }
      editProfileMutation.mutate(formData, {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeyStore.users.detail(username).queryKey,
            exact: true,
          })
          queryClient.invalidateQueries({
            queryKey: queryKeyStore.users.currentUserPreview.queryKey,
            exact: true,
          })
        },
      })
      close()
    }

    if (isImageLoading) {
      return (
        <div className=" loading loading-spinner loading-md text-center"></div>
      )
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <button ref={ref} type="submit" className=" hidden"></button>
        <BackgroundImageSection control={control} />
        <EditProfileFormFields
          control={control}
          register={register}
          errors={errors}
        />
      </form>
    )
  },
)
