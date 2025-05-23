import {
  ClickableComponentProps,
  ComponentWithChildrenProps,
  LabeledComponentProps,
} from '@/src/common/props'

const sizes = {
  sm: 'btn-sm',
  md: 'btn-md text-base',
}
const tooltipPositions = {
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  right: 'tooltip-right',
  left: 'tooltip-left',
}

interface Props
  extends ComponentWithChildrenProps,
    ClickableComponentProps,
    LabeledComponentProps {
  tooltipPosition?: keyof typeof tooltipPositions
  isGhost?: boolean
  size?: keyof typeof sizes
}

export const CircleButton = ({
  onClick,
  label,
  tooltipPosition = 'bottom',
  size = 'md',
  isGhost = true,
  children,
}: Props) => {
  return (
    <div
      data-tip={label}
      className={`tooltip !z-10 ${tooltipPositions[tooltipPosition]} tooltip-secondary`}
    >
      <button
        aria-label={label}
        type="button"
        onClick={onClick}
        className={`btn btn-circle ${isGhost && 'btn-ghost'} ${sizes[size]} `}
      >
        {children}
      </button>
    </div>
  )
}
