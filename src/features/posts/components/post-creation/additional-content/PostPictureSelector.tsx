import { PictureSelector } from '@/src/components/picture-composer/PictureSelector'
import { usePostContext } from '../../../contexts/PostContext'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES_PER_POST,
} from '../../../schemas/createPostSchema'
import { SchemaUploadImageResponseDto } from '@/src/generated/schema'

export const PostPictureSelector = () => {
  const {
    postImages,
    appendPostImage,
    updatePostImages,
    getValues,
    isImageUploading,
    setIsImageUploading,
  } = usePostContext()!

  const handlePictureAttach = (file: File, key: string) => {
    appendPostImage({ file, key })
  }

  const handlePictureUpload = (
    response: SchemaUploadImageResponseDto,
    key: string,
  ) => {
    const pictures = getValues('postImages')
    const uploadedPictureIndex = pictures.findIndex(
      (picture) => picture.key === key,
    )
    if (uploadedPictureIndex === -1) {
      return
    }
    const uploadedPicture = pictures[uploadedPictureIndex]
    updatePostImages(uploadedPictureIndex, {
      ...uploadedPicture,
      imageKey: response.fileName,
    })
  }

  const isSelectorDisabled =
    postImages.length >= MAX_IMAGES_PER_POST || isImageUploading

  return (
    <PictureSelector
      disabled={isSelectorDisabled}
      acceptedPictureFormats={ACCEPTED_IMAGE_TYPES}
      onPictureAttach={handlePictureAttach}
      onPictureUpload={handlePictureUpload}
      setIsImageUploading={setIsImageUploading}
    />
  )
}
