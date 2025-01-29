import { PictureDropzone } from '@/src/components/form/picture-dropzone/PictureDropzone'
import { SchemaUploadImageResponseDto } from '@/src/generated/schema'
import { EditProfileFormType, EditProfilePicture } from '../../schemas'
import { FieldPath, UseFormGetValues } from 'react-hook-form'

interface Props {
  onChange: (picture: EditProfilePicture | null) => void
  value: EditProfilePicture | null
  existingPictureUrl?: string | null
  getValues: UseFormGetValues<EditProfileFormType>
  name: FieldPath<EditProfileFormType>
  placeholderContent?: React.ReactNode
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfilePictureDropzone = ({
  onChange,
  value,
  existingPictureUrl,
  getValues,
  name,
  placeholderContent,
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
    onChange({ ...existingPicture, imageKey: response.fileName })
  }

  return (
    <PictureDropzone
      value={value}
      pictureUrl={existingPictureUrl}
      onPictureAttach={handlePictureAttach}
      onPictureRemove={handlePictureRemove}
      onPictureUpload={handlePictureUpload}
      setIsImageUploading={setIsImageUploading}
      placeholderContent={placeholderContent}
    />
  )
}
