import { useMessageFormContext } from '../../contexts/MessageFormContext'
import { MessagePicturePreview } from './MessagePicturePreview'

export const MessagePictures = () => {
  const { fields, isImageUploading } = useMessageFormContext()!

  return (
    <div>
      {fields.map((picture, index) => (
        <MessagePicturePreview
          key={picture.id}
          messagePicture={picture}
          isUploading={isImageUploading}
          index={index}
        />
      ))}
    </div>
  )
}
