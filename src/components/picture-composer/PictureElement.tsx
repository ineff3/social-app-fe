import { CloseCircleButton } from '../ui/buttons/CloseCircleButton'

interface Props {
  file: File
  width: number
  height: number
  onRemove: (index: number) => void
  index: number
}

export const PictureElement = ({
  file,
  width,
  height,
  onRemove,
  index,
}: Props) => {
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
        src={URL.createObjectURL(file)}
      />
      <div className="absolute right-1 top-1">
        <CloseCircleButton
          onClick={() => onRemove(index)}
          isGhost={false}
          size="sm"
          tooltipPosition="left"
        />
      </div>
      <div className=" absolute left-2 top-1 ">{index + 1}</div>
    </div>
  )
}
