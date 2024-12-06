import { DropdownItem } from '@/src/types'
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { ComponentProps, forwardRef, Fragment } from 'react'
import { SlOptions } from 'react-icons/sl'

type WidthType = 'default' | 'fit-content'
interface Props {
  items: DropdownItem[]
  anchor: ComponentProps<typeof MenuItems>['anchor']
  width?: WidthType
  OpenButton?: React.ForwardRefExoticComponent<
    object & React.RefAttributes<HTMLButtonElement>
  >
}

const DefaultDropdownButton = forwardRef(
  (props: MenuButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, ...rest } = props

    return (
      <div data-tip="Options" className=" tooltip tooltip-secondary">
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

export const DropdownMenu = ({
  items,
  anchor,
  width = 'default',
  OpenButton = DefaultDropdownButton,
}: Props) => {
  return (
    <div className="relative text-right">
      <Menu>
        <MenuButton as={OpenButton} />
        <Transition
          as={Fragment}
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor={anchor}
            className={` absolute z-[10] flex ${width === 'default' && 'w-[240px]'} origin-center flex-col overflow-hidden rounded-xl bg-base-100  shadow-[0px_0px_20px_-8px_rgba(255,255,255,1);] ring-1 ring-black/5 focus:outline-none`}
          >
            {items.length === 0 && (
              <MenuItem>
                <div className="flex items-center gap-3 px-5 py-3">
                  No options available
                </div>
              </MenuItem>
            )}
            {items.map((item) => (
              <MenuItem key={item.value}>
                <button
                  className={`flex items-center gap-3 px-5 py-3 ${item.dangerItem && 'text-error'} border-b border-base-200 data-[focus]:bg-neutral`}
                  onClick={item.action}
                >
                  <item.Icon {...item.iconProps} />
                  <span>{item.title}</span>
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
