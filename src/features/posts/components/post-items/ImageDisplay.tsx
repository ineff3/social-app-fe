interface Props {
  imageUrls: string[]
}
// TODO: generate alt based on image, or request it from user.

export const ImageDisplay = ({ imageUrls }: Props) => {
  return (
    <div
      className={`grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]  overflow-hidden rounded-lg ${imageUrls.length > 2 ? 'max-h-[550px] grid-rows-2' : 'max-h-[500px] grid-rows-1'}  `}
    >
      {imageUrls?.map((path, index) => (
        <div
          key={index}
          className={` ${imageUrls?.length === 3 && index === 0 && 'col-span-2'}`}
        >
          <img
            src={path}
            alt="Post Image"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
