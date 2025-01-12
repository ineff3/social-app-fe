import { ComponentWithChildrenProps } from '@/src/common/props'

export const BlockContainer = ({ children }: ComponentWithChildrenProps) => {
  return (
    <div className="rounded-lg border border-accent bg-base-100 py-4">
      {children}
    </div>
  )
}
