import { DropdownItem } from '@/src/common/types'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Fragment } from 'react'
import { DefaultDropdownButton } from './DefaultDropdownButton'
import { ComponentWithAnchorProps } from '@/src/common/props'

type WidthType = 'default' | 'fit-content'
interface Props {
  items: DropdownItem[]
  width?: WidthType
  OpenButton?: React.ForwardRefExoticComponent<
    object & React.RefAttributes<HTMLButtonElement>
  >
}

export const DropdownMenu = ({
  items,
  anchor,
  width = 'default',
  OpenButton = DefaultDropdownButton,
}: Props & ComponentWithAnchorProps) => {
  return (
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
          anchor={typeof anchor === 'string' ? { to: anchor, gap: 10 } : anchor}
          className={` absolute z-[10] flex ${width === 'default' && 'w-[240px]'} origin-center flex-col overflow-hidden rounded-xl border border-accent bg-base-100 ring-1 ring-black/5 focus:outline-none`}
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
  )
}
