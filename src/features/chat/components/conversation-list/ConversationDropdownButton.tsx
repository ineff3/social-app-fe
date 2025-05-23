import { MenuButtonProps } from '@headlessui/react'
import { forwardRef } from 'react'
import { SlOptions } from 'react-icons/sl'

export const ConversationDropdownButton = forwardRef(
  (props: MenuButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, ...rest } = props

    return (
      <div data-tip="Options" className=" tooltip tooltip-secondary">
        <button
          {...rest}
          ref={ref}
          className={' btn btn-ghost btn-xs data-[active]:btn-active '}
          aria-label="Options"
        >
          <SlOptions size={18} />
        </button>
      </div>
    )
  },
)
