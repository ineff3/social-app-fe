import { useHandlePictureUpload } from '@/src/hooks/media/useHandlePictureUpload'
import { usePictureUploadHandlers } from './usePictureUploadHandlers'
import { useMessageFormContext } from '../../contexts/MessageFormContext'
import { MAX_IMAGES_PER_MESSAGE } from '../../constants'
import { toast } from 'react-toastify'

export const useHandleImagePaste = () => {
  const { fields, setIsImageUploading } = useMessageFormContext()!
  const { handlePictureAttach, handlePictureUpload, handleRemovePicture } =
    usePictureUploadHandlers()

  const uploadPicture = useHandlePictureUpload({
    onPictureAttach: handlePictureAttach,
    onPictureRemove: handleRemovePicture,
    onPictureUpload: handlePictureUpload,
    setIsImageUploading,
  })

  const handlePaste = (e: React.ClipboardEvent) => {
    if (fields.length >= MAX_IMAGES_PER_MESSAGE) {
      toast.error(
        `Unable to upload more than ${MAX_IMAGES_PER_MESSAGE} image per message.`,
        {
          position: 'top-center',
        },
      )
      return
    }

    const items = e.clipboardData?.items

    for (const item of items) {
      const file = item.getAsFile()
      if (file) {
        uploadPicture(file, 'message')
      }
    }
  }

  return handlePaste
}
