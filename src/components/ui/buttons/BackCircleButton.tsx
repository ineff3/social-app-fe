import { ComponentProps } from 'react'
import { CircleButton } from './CircleButton'
import { useNavigateBackwards } from '@/src/hooks/useNavigateBackwards'
import ArrowIconSvg from '../icons/ArrowIconSvg'
import { ComponentWithClassNameProps } from '@/src/common/props'

export const BackCircleButton = ({
  className,
  ...rest
}: Omit<ComponentProps<typeof CircleButton>, 'onClick' | 'label' | 'children'> &
  ComponentWithClassNameProps) => {
  const navBack = useNavigateBackwards()

  return (
    <CircleButton {...rest} label="Back" onClick={navBack}>
      <ArrowIconSvg
        width={18}
        height={18}
        fill="currentColor"
        className={className}
      />
    </CircleButton>
  )
}
