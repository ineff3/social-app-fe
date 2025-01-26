import { PictureSelector } from '@/src/components/picture-composer/PictureSelector'
import { usePostContext } from '../../../contexts/PostContext'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES_PER_POST,
} from '../../../schemas/createPostSchema'
import { SchemaUploadImageResponseDto } from '@/src/generated/schema'
import { PostPicture } from '../../../interfaces'

export const PostPictureSelector = () => {
  const {
    postImages,
    appendPostImage,
    updatePostImages,
    replacePostImages,
    getValues,
    isImageUploading,
    setIsImageUploading,
  } = usePostContext()!

  const handlePictureAttach = (file: File, key: string) => {
    appendPostImage({ file, key })
  }

  const handleRemovePicture = (key: string) => {
    const postImages = getValues('postImages')

    replacePostImages(postImages.filter((picture) => picture.key !== key))
  }

  const handlePictureUpload = (
    response: SchemaUploadImageResponseDto,
    key: string,
  ) => {
    const result = findPictureAndIndex(key)
    if (!result) {
      return
    }
    const [index, picture] = result

    updatePostImages(index, {
      ...picture,
      imageKey: response.fileName,
    })
  }

  const findPictureAndIndex = (key: string): [number, PostPicture] | null => {
    const pictures = getValues('postImages')
    const uploadedPictureIndex = pictures.findIndex(
      (picture) => picture.key === key,
    )
    if (uploadedPictureIndex === -1) {
      return null
    }
    const uploadedPicture = pictures[uploadedPictureIndex]
    return [uploadedPictureIndex, uploadedPicture]
  }

  const isSelectorDisabled =
    postImages.length >= MAX_IMAGES_PER_POST || isImageUploading

  return (
    <PictureSelector
      disabled={isSelectorDisabled}
      acceptedPictureFormats={ACCEPTED_IMAGE_TYPES}
      onPictureAttach={handlePictureAttach}
      onPictureRemove={handleRemovePicture}
      onPictureUpload={handlePictureUpload}
      setIsImageUploading={setIsImageUploading}
    />
  )
}
