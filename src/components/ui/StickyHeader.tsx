import { ComponentWithChildrenProps } from '@/src/common/props'
import { useIsScrolled } from '@/src/hooks/useIsScrolled'
import { RefObject } from 'react'

interface Props extends ComponentWithChildrenProps {
  scrolledElementRef: RefObject<HTMLElement>
}

export const StickyHeader = ({ children, scrolledElementRef }: Props) => {
  const isScrolled = useIsScrolled({ scrolledElementRef })
  return (
    <header
      className={`sticky top-0 z-10 border-b border-accent bg-base-100 ${isScrolled && ' bg-opacity-60 backdrop-blur-sm'}`}
    >
      {children}
    </header>
  )
}
