import { CircleButton } from '@/src/components/ui/buttons/CircleButton'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { CircleToggleButton } from './CircleToggleButton'
import { CONV_POPOVER_HEADER_HEIGHT } from '../../constants'
import { toPx } from '@/src/common/converters/toPx'

interface Props {
  isOpen: boolean
  onToggle: () => void
  onNewMessage: () => void
}

export const ConvPopoverHeader = ({
  isOpen,
  onToggle,
  onNewMessage,
}: Props) => {
  return (
    <div
      className="flex w-full items-center justify-between px-4 py-3 text-secondary"
      style={{ maxHeight: toPx(CONV_POPOVER_HEADER_HEIGHT) }}
    >
      <span className="text-lg font-bold">Messages</span>
      <div className="flex gap-2">
        <CircleButton
          size="sm"
          tooltipPosition="top"
          onClick={onNewMessage}
          label="New message"
        >
          <FaRegPenToSquare size={18} />
        </CircleButton>
        <CircleToggleButton isOpen={isOpen} onToggle={onToggle} />
      </div>
    </div>
  )
}
