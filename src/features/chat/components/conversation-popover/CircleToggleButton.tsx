import { CircleButton } from '@/src/components/ui/buttons/CircleButton'
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
  isOpen: boolean
  onToggle: () => void
}

export const CircleToggleButton = ({ onToggle, isOpen }: Props) => {
  return (
    <CircleButton
      size="sm"
      tooltipPosition={isOpen ? 'bottom' : 'top'}
      onClick={onToggle}
      label={isOpen ? 'Collapse' : 'Expand'}
    >
      <IoIosArrowDown
        size={25}
        className={`text-secondary transition-all duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
      />
    </CircleButton>
  )
}
