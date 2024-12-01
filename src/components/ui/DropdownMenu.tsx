import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { ComponentProps, Fragment, SVGProps } from 'react'
import { SlOptions } from 'react-icons/sl'

type IconProps = SVGProps<SVGSVGElement>

export interface DropdownItem {
  title: string
  value: string
  Icon: (props: IconProps) => JSX.Element
  iconProps?: IconProps
  action: () => void
  dangerItem?: boolean
}

interface Props {
  items: DropdownItem[]
  anchor: ComponentProps<typeof MenuItems>['anchor']
}

export const DropdownMenu = ({ items, anchor }: Props) => {
  return (
    <div className="relative text-right">
      <Menu>
        <MenuButton as={Fragment}>
          {({ active }) => (
            <button
              aria-label="Options"
              className={` btn btn-ghost btn-sm ${active && 'btn-active'} `}
            >
              <SlOptions size={18} />
            </button>
          )}
        </MenuButton>
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
            className=" absolute z-[10] flex w-[240px] origin-center flex-col overflow-hidden rounded-xl bg-base-100  shadow-[0px_0px_20px_-8px_rgba(255,255,255,1);] ring-1 ring-black/5 focus:outline-none"
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
