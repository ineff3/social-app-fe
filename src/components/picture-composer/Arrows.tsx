import { CircleButton } from '../ui/buttons/CircleButton'
import ArrowIcon from '../ui/icons/ArrowIcon'

interface Props {
  hasNextPage: boolean
  hasPrevPage: boolean
  onNextPage: () => void
  onPrevPage: () => void
}

export const Arrows = ({
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}: Props) => {
  return (
    <>
      {hasNextPage && (
        <div className=" absolute right-0 top-1/2 -translate-y-1/2">
          <CircleButton
            onClick={onNextPage}
            label="Next"
            isGhost={false}
            tooltipPosition="left"
            size="sm"
          >
            <div className="rotate-180">
              <ArrowIcon />
            </div>
          </CircleButton>
        </div>
      )}
      {hasPrevPage && (
        <div className=" absolute left-0 top-1/2 -translate-y-1/2">
          <CircleButton
            onClick={onPrevPage}
            label="Back"
            isGhost={false}
            size="sm"
            tooltipPosition="right"
          >
            <ArrowIcon />
          </CircleButton>
        </div>
      )}
    </>
  )
}
