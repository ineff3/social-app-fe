import { SchemaUploadImageResponseDto } from '@/src/generated/schema'
import { useMessageFormContext } from '../../contexts/MessageFormContext'

export const usePictureUploadHandlers = () => {
  const { append, replace, getValues } = useMessageFormContext()!

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
              id: messageImage.key,
              uploadData: response,
            }
          : messageImage,
      ),
    )
  }

  return { handlePictureAttach, handleRemovePicture, handlePictureUpload }
}
