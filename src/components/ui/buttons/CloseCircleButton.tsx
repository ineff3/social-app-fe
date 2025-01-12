import { ComponentProps } from 'react'
import { CircleButton } from './CircleButton'
import { ComponentWithClassNameProps } from '@/src/common/props'

export const CloseCircleButton = ({
  className,
  ...rest
}: Omit<ComponentProps<typeof CircleButton>, 'label' | 'children'> &
  ComponentWithClassNameProps) => {
  return (
    <CircleButton {...rest} label="Close">
      <span className={className}>✕</span>
    </CircleButton>
  )
}
