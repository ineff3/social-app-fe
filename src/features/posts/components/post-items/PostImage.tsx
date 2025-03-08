import { SchemaImageResponseDto } from '@/src/generated/schema'
import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import { Blurhash } from 'react-blurhash'

interface Props {
  image: SchemaImageResponseDto
}

const MAX_HEIGHT = 450
const MIN_WIDTH = 230

export const PostImage = ({
  image: {
    blurhash,
    imageUrl,
    dimensions: { width, height },
  },
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [maxWidth, setMaxWidth] = useState<number>(width)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const updateSize = () => {
      const availableWidth =
        containerRef.current?.parentElement?.clientWidth || width
      const calculatedWidth = Math.min(availableWidth, width)

      setMaxWidth(Math.max(calculatedWidth, MIN_WIDTH))
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [width])

  let renderedWidth = maxWidth
  let renderedHeight = Math.round((maxWidth * height) / width)

  if (renderedHeight > MAX_HEIGHT) {
    renderedHeight = MAX_HEIGHT
    renderedWidth = Math.round((MAX_HEIGHT * width) / height)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border border-accent"
      style={{ maxWidth: renderedWidth, height: renderedHeight }}
    >
      <Blurhash
        hash={blurhash}
        height={renderedHeight}
        style={{ width: '100%' }}
      />
      <img
        style={{
          maxWidth: '100%',
          height: renderedHeight,
        }}
        src={imageUrl}
        alt="Post Image"
        className={clsx(
          'absolute left-0 top-0 z-10 w-full transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
