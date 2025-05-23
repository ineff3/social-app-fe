import { SchemaImageUploadDto, SchemaUploadImageResponseDto } from '@/src/generated/schema'
import { EditProfilePicture } from '../../schemas'
import { FieldPath, UseFormGetValues } from 'react-hook-form'
import { lazy, Suspense } from 'react'
import { PictureDropzoneSuspense } from '@/src/components/form/picture-dropzone/PictureDropzoneSuspense'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const PictureDropzone = lazy(() => import('@/src/components/form/picture-dropzone/PictureDropzone'))

interface Props<TFormType extends object> {
  onChange: (picture: EditProfilePicture | null) => void
  value: EditProfilePicture | null
  existingPictureUrl?: string | null
  getValues: UseFormGetValues<TFormType>
  name: FieldPath<TFormType>
  placeholderContent?: React.ReactNode
  isImageUploading: boolean
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
  imageType: SchemaImageUploadDto['imageType']
}

export const EditProfileDropzone = <TFormType extends object>({
  onChange,
  value,
  existingPictureUrl,
  getValues,
  name,
  placeholderContent,
  isImageUploading,
  setIsImageUploading,
  imageType,
}: Props<TFormType>) => {
  const handlePictureAttach = (file: File) => {
    onChange({ file })
  }

  const handlePictureRemove = () => {
    onChange(null)
  }

  const handlePictureUpload = (response: SchemaUploadImageResponseDto) => {
    const existingPicture = getValues(name) as EditProfilePicture | null
    if (!existingPicture) {
      return
    }
    onChange({ ...existingPicture, imageKey: response.imageKey })
  }

  return (
    <Suspense
      fallback={
        <PictureDropzoneSuspense
          value={value}
          pictureUrl={existingPictureUrl}
          placeholderContent={placeholderContent}
        />
      }
    >
      <PictureDropzone
        value={value}
        acceptedPictureFormats={ACCEPTED_IMAGE_TYPES}
        pictureUrl={existingPictureUrl}
        onPictureAttach={handlePictureAttach}
        onPictureRemove={handlePictureRemove}
        onPictureUpload={handlePictureUpload}
        isImageUploading={isImageUploading}
        setIsImageUploading={setIsImageUploading}
        placeholderContent={placeholderContent}
        imageType={imageType}
      />
    </Suspense>
  )
}
