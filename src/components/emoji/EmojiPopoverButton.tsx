import React, { forwardRef } from 'react'
import { SmileIcon } from '../ui/icons'

export const EmojiPopoverButton = forwardRef(
  (props, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
      <div data-tip="Emoji" className=" tooltip tooltip-secondary relative">
        <button
          type="button"
          className="btn btn-circle btn-ghost btn-sm p-0.5"
          ref={ref}
          {...props}
        >
          <SmileIcon />
        </button>
      </div>
    )
  },
)
