import { MediaButton } from '@/src/components/media-handling/picture-selector/picture-selector-buttons/MediaButton'
import { PictureSelector } from '@/src/components/media-handling/picture-selector/PictureSelector'
import { useMessageFormContext } from '../../../contexts/MessageFormContext'
import { SchemaUploadImageResponseDto } from '@/src/generated/schema'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const MAX_IMAGES_PER_MESSAGE = 1

export const MessagePictureSelector = () => {
  const {
    isImageUploading,
    setIsImageUploading,
    fields,
    append,
    replace,
    getValues,
  } = useMessageFormContext()!

  const handlePictureAttach = (file: File, key: string) => {
    append({ file, key, id: key })
  }

  const handleRemovePicture = (key: string) => {
    const messageImages = getValues('messageImages')

    replace(messageImages.filter((messageImage) => messageImage.key !== key))
  }

  const handlePictureUpload = (
    response: SchemaUploadImageResponseDto,
    key: string,
  ) => {
    const messageImages = getValues('messageImages')

    replace(
      messageImages.map((messageImage) =>
        messageImage.key === key
          ? {
              ...messageImage,
              imageKey: response.fileName,
              imageUrl: response.imageUrl,
              id: messageImage.key,
            }
          : messageImage,
      ),
    )
  }

  const isSelectorDisabled =
    fields.length >= MAX_IMAGES_PER_MESSAGE || isImageUploading

  return (
    <PictureSelector
      disabled={isSelectorDisabled}
      acceptedPictureFormats={ACCEPTED_IMAGE_TYPES}
      pictureUploadType="message"
      renderButton={({ onClick, disabled }) => (
        <MediaButton onClick={onClick} disabled={disabled} />
      )}
      onPictureAttach={handlePictureAttach}
      onPictureRemove={handleRemovePicture}
      onPictureUpload={handlePictureUpload}
      setIsImageUploading={setIsImageUploading}
    />
  )
}
