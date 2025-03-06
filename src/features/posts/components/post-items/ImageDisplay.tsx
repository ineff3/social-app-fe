import { SchemaImageResponseDto } from '@/src/generated/schema'
import { PostImage } from './PostImage'
import clsx from 'clsx'

interface Props {
  postImages: SchemaImageResponseDto[]
}

export const ImageDisplay = ({ postImages }: Props) => {
  const { length } = postImages

  if (length === 0) {
    return null
  }

  if (length === 1) {
    return <PostImage image={postImages[0]} />
  }

  return (
    <div
      className={clsx(
        'grid max-h-[200px] w-[min(630px,_100%)] max-w-full grid-cols-2 gap-[2px] overflow-hidden rounded-lg sm:max-h-[400px]',
        length > 2 ? 'grid-rows-2' : 'grid-rows-1',
      )}
    >
      {postImages.map(({ id, imageUrl }, index) => (
        <div
          key={id}
          className={clsx(length === 3 && index === 0 && 'row-span-2')}
        >
          <img
            src={imageUrl}
            alt="Post Image"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
