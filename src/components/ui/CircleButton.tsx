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

interface Props {
  onClick: React.MouseEventHandler
  label: string
  tooltipPosition: keyof typeof tooltipPositions
  children: React.ReactNode
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
      className={`tooltip ${tooltipPositions[tooltipPosition]} tooltip-secondary`}
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
