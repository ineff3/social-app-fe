import { PopoverPanel } from '@headlessui/react'
import { ComponentProps } from 'react'

export type SelectableComponentProps<T> = {
  onSelect: (value: T) => void
}

export type ComponentWithAnchorProps = {
  anchor: ComponentProps<typeof PopoverPanel>['anchor']
}
