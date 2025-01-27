import { useDeleteImage } from '@/src/hooks/media/useDeleteImage'
import { CloseCircleButton } from '../ui/buttons/CloseCircleButton'
import { Spinner } from '../ui/spinners/Spinner'
import { PostPicture } from '@/src/features/posts/interfaces'
import { getPostPictureSource } from './helpers'

interface Props {
  postPicture: PostPicture
  width: number
  height: number
  onRemove: (index: number) => void
  index: number
  isUploading: boolean
}

export const PictureElement = ({
  postPicture,
  width,
  height,
  onRemove,
  index,
  isUploading,
}: Props) => {
  const deleteImageMutation = useDeleteImage()

  const handleRemove = () => {
    onRemove(index)

    // Don't want to remove picture from s3, when it's saved for draft post.
    if (postPicture.source === 'url') {
      return
    }

    const { imageKey } = postPicture
    if (!imageKey) {
      return
    }
    const encodedImageKey = window.btoa(imageKey)
    deleteImageMutation.mutate(encodedImageKey)
  }

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={`relative shrink-0 overflow-hidden rounded-lg`}
    >
      <img
        className="h-full w-full object-cover"
        src={getPostPictureSource(postPicture)}
      />
      {!isUploading && (
        <>
          <div className="absolute right-1 top-1">
            <CloseCircleButton
              onClick={handleRemove}
              isGhost={false}
              size="sm"
              tooltipPosition="left"
            />
          </div>
          <div className=" absolute left-2 top-1 ">{index + 1}</div>
        </>
      )}
      {isUploading && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-lg backdrop-blur">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  )
}
