import { PictureDropzone } from '@/src/components/form/picture-dropzone/PictureDropzone'
import { SchemaUploadImageResponseDto } from '@/src/generated/schema'
import { EditProfileFormType, EditProfilePicture } from '../../schemas'
import { FieldPath, UseFormGetValues } from 'react-hook-form'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

interface Props {
  onChange: (picture: EditProfilePicture | null) => void
  value: EditProfilePicture | null
  existingPictureUrl?: string | null
  getValues: UseFormGetValues<EditProfileFormType>
  name: FieldPath<EditProfileFormType>
  placeholderContent?: React.ReactNode
  isImageUploading: boolean
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfileDropzone = ({
  onChange,
  value,
  existingPictureUrl,
  getValues,
  name,
  placeholderContent,
  isImageUploading,
  setIsImageUploading,
}: Props) => {
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
    />
  )
}
