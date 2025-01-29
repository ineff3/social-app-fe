import {
  SchemaImageUploadDto,
  SchemaUploadImageResponseDto,
} from '@/src/generated/schema'
import { useUploadImage } from './useUploadImage'
import { toast } from 'react-toastify'

export interface PictureUploadProps {
  onPictureAttach: (file: File, key: string) => void
  onPictureRemove: (key: string) => void
  onPictureUpload: (response: SchemaUploadImageResponseDto, key: string) => void
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

export const useHandlePictureUpload = ({
  onPictureAttach,
  onPictureRemove,
  onPictureUpload,
  setIsImageUploading,
}: PictureUploadProps) => {
  const uploadImageMutation = useUploadImage()

  const handlePictureUpload = (
    file: File,
    type: SchemaImageUploadDto['imageType'],
  ) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('imageType', type)

    const key = crypto.randomUUID()

    uploadImageMutation.mutate(formData, {
      onSuccess: (response) => {
        onPictureUpload(response, key)
      },
      onError: () => {
        onPictureRemove(key)
        toast.error('Unable to upload an image. Please try later.', {
          position: 'top-center',
        })
      },
      onSettled: () => {
        setIsImageUploading(false)
      },
    })

    setIsImageUploading(true)
    onPictureAttach(file, key)
  }

  return handlePictureUpload
}
