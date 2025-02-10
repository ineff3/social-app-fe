import { PictureFullscreenDisplay } from '@/src/components/media-handling/picture-fullscreen-display/PictureFullscreenDisplay'
import { SchemaMessageImageResponseDto } from '@/src/generated/schema'
import { useModal } from '@/src/hooks/useModal'
import { useState } from 'react'
import { Blurhash } from 'react-blurhash'

interface Props {
  messageImage: SchemaMessageImageResponseDto
  hasSingleImage: boolean
}
const MAX_SIZE = 370

export const MessagePicture = ({
  messageImage: {
    blurhash,
    imageUrl,
    dimensions: { width, height },
  },
  hasSingleImage,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { show, close, visible } = useModal()

  let renderedWidth = width
  let renderedHeight = height

  if (width > MAX_SIZE) {
    renderedWidth = MAX_SIZE
    renderedHeight = Math.round((MAX_SIZE * height) / width)
  }
  if (renderedHeight > MAX_SIZE) {
    renderedHeight = MAX_SIZE
    renderedWidth = Math.round((MAX_SIZE * width) / height)
  }

  return (
    <>
      <div
        className={`h-full w-full overflow-hidden ${
          hasSingleImage ? 'rounded-2xl' : 'rounded-b-md rounded-t-2xl'
        }`}
      >
        <div
          className="relative w-full overflow-hidden rounded-2xl backdrop-blur-lg"
          style={{
            minWidth: renderedWidth,
            height: renderedHeight,
          }}
        >
          <Blurhash hash={blurhash} width="100%" height={renderedHeight} />
          <img
            src={imageUrl}
            alt="Message Image"
            className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 object-contain transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={show}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
      <PictureFullscreenDisplay
        isVisible={visible}
        onClose={close}
        imageUrl={imageUrl}
      />
    </>
  )
}
