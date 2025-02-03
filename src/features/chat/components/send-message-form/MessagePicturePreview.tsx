import { useDeleteImage } from '@/src/hooks/media/useDeleteImage'
import { useMessageFormContext } from '../../contexts/MessageFormContext'
import { CloseCircleButton } from '@/src/components/ui/buttons/CloseCircleButton'
import { Spinner } from '@/src/components/ui/spinners/Spinner'
import { toPx } from '@/src/common/converters/toPx'
import { MessagePicture } from '../../interfaces'

const PICTURE_SIZE = 200

interface Props {
  messagePicture: MessagePicture
  index: number
  isUploading: boolean
}

export const MessagePicturePreview = ({
  messagePicture,
  index,
  isUploading,
}: Props) => {
  const { remove } = useMessageFormContext()!
  const deleteImageMutation = useDeleteImage()

  const handleRemove = () => {
    remove(index)

    const { imageKey } = messagePicture.uploadData!
    if (!imageKey) {
      return
    }
    const encodedImageKey = window.btoa(imageKey)
    deleteImageMutation.mutate(encodedImageKey)
  }

  return (
    <div
      style={{ width: toPx(PICTURE_SIZE), height: toPx(PICTURE_SIZE) }}
      className="relative shrink-0 overflow-hidden rounded-lg"
    >
      <img
        className="h-full w-full object-cover"
        src={URL.createObjectURL(messagePicture.file)}
      />
      {!isUploading && (
        <div className="absolute right-1 top-1">
          <CloseCircleButton
            onClick={handleRemove}
            isGhost={false}
            size="sm"
            tooltipPosition="left"
          />
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-lg backdrop-blur">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  )
}
