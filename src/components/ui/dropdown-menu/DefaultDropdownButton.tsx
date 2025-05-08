import { MenuButtonProps } from '@headlessui/react'
import { forwardRef } from 'react'
import { SlOptions } from 'react-icons/sl'

export const DefaultDropdownButton = forwardRef(
  (props: MenuButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, ...rest } = props

    return (
      <div data-tip="Options" className=" tooltip tooltip-secondary z-10">
        <button
          {...rest}
          ref={ref}
          className={' btn btn-ghost btn-sm data-[active]:btn-active '}
          aria-label="Options"
        >
          <SlOptions size={18} />
        </button>
      </div>
    )
  },
)
