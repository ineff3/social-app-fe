import { PopoverPanel } from '@headlessui/react'
import { ComponentProps, ReactNode } from 'react'

export type SelectableComponentProps<T> = {
  onSelect: (value: T) => void
}

export type ComponentWithAnchorProps = {
  anchor: ComponentProps<typeof PopoverPanel>['anchor']
}

export type ComponentWithChildrenProps = {
  children: ReactNode
}

export type ClickableComponentProps = {
  onClick: React.MouseEventHandler
}

export type LabeledComponentProps = {
  label: string
}

export type ComponentWithClassNameProps = {
  className?: string
}
