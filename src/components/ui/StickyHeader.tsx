import {
  ComponentWithChildrenProps,
  ComponentWithClassNameProps,
} from '@/src/common/props'
import { useIsScrolled } from '@/src/hooks/useIsScrolled'
import { RefObject } from 'react'

interface Props
  extends ComponentWithChildrenProps,
    ComponentWithClassNameProps {
  scrolledElementRef: RefObject<HTMLElement>
}

export const StickyHeader = ({
  children,
  scrolledElementRef,
  className,
}: Props) => {
  const isScrolled = useIsScrolled({ scrolledElementRef })
  return (
    <header
      className={`sticky top-0 z-20 border-b border-accent bg-base-100 ${className} ${isScrolled && ' bg-opacity-60 backdrop-blur-sm'}`}
    >
      {children}
    </header>
  )
}
