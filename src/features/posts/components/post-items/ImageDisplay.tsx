import { SchemaPostImageResponseDto } from '@/src/generated/schema'

interface Props {
  postImages: SchemaPostImageResponseDto[]
}
// TODO: generate alt based on image, or request it from user.

export const ImageDisplay = ({ postImages }: Props) => {
  const { length } = postImages
  return (
    <div
      className={`grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]  overflow-hidden rounded-lg ${length > 2 ? 'max-h-[550px] grid-rows-2' : 'max-h-[500px] grid-rows-1'}  `}
    >
      {postImages?.map(({ id, imageUrl }, index) => (
        <div
          key={id}
          className={`${length === 3 && index === 0 && 'col-span-2'}`}
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
