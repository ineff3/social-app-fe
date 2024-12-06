import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'
import { MenuButtonProps } from '@headlessui/react'
import { forwardRef } from 'react'

export const RepostButton = forwardRef(
  (props: MenuButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, ...rest } = props

    return (
      <div data-tip="Repost" className=" tooltip tooltip-secondary">
        <button
          {...rest}
          ref={ref}
          aria-label="Repost"
          className=" btn btn-circle btn-ghost btn-sm data-[active]:btn-active"
        >
          <RepostIconSvg width={22} height={22} fill="currentColor" />
        </button>
      </div>
    )
  },
)
