import { SchemaImageResponseDto } from '@/src/generated/schema'

interface Props {
  postImages: SchemaImageResponseDto[]
}

const getGridTemplate = (length: number) => {
  switch (length) {
    case 1:
      return 'grid-cols-1 grid-rows-1'
    case 2:
      return 'grid-cols-2 grid-rows-1'
    default:
      return 'grid-cols-2 grid-rows-2'
  }
}

export const PicturesGrid = ({ postImages }: Props) => {
  const { length } = postImages
  if (length === 0) {
    return null
  }

  return (
    <div
      className={`grid h-[60px] w-[60px] flex-shrink-0 gap-1 ${getGridTemplate(length)} `}
    >
      {postImages.map(({ imageUrl }, index) => (
        <div
          key={index}
          className="flex items-center justify-center overflow-hidden"
        >
          <img
            src={imageUrl}
            alt="Draft image"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
