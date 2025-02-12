import { MediaButton } from '@/src/components/media-handling/picture-selector/picture-selector-buttons/MediaButton'
import { PictureSelector } from '@/src/components/media-handling/picture-selector/PictureSelector'
import { useMessageFormContext } from '../../../contexts/MessageFormContext'
import { MAX_IMAGES_PER_MESSAGE } from '../../../constants'
import { usePictureUploadHandlers } from '../../../hooks/message-form/usePictureUploadHandlers'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const MessagePictureSelector = () => {
  const { isImageUploading, setIsImageUploading, fields } =
    useMessageFormContext()!

  const { handlePictureAttach, handlePictureUpload, handleRemovePicture } =
    usePictureUploadHandlers()

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
