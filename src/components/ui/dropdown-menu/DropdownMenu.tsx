import { DropdownItem } from '@/src/common/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { DefaultDropdownButton } from './DefaultDropdownButton'
import { ComponentWithAnchorProps } from '@/src/common/props'
import { BackgroundFreeze } from './BackgroundFreeze'
interface Props {
  items: DropdownItem[]
  OpenButton?: React.ForwardRefExoticComponent<
    object & React.RefAttributes<HTMLButtonElement>
  >
  disableBackground?: boolean
  isMinimized?: boolean
}
export const DropdownMenu = ({
  items,
  anchor,
  OpenButton = DefaultDropdownButton,
  disableBackground = false,
  isMinimized = false,
}: Props & ComponentWithAnchorProps) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          {disableBackground && <BackgroundFreeze open={open} />}
          <MenuButton as={OpenButton} />
          <MenuItems
            anchor={
              typeof anchor === 'string' ? { to: anchor, gap: 10 } : anchor
            }
            transition={true}
            className={`fixed z-[10] flex origin-center flex-col overflow-hidden rounded-xl border border-accent bg-base-100 ring-1 ring-black/5 transition duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0
              ${!isMinimized && 'w-[240px]'}
            `}
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
                  className={`flex items-center border-b border-base-200 data-[focus]:bg-neutral
                    ${item.dangerItem && 'text-error'}
                    ${isMinimized ? 'px-3 py-2' : 'px-5 py-3'}
                  `}
                  onClick={item.action}
                >
                  <div className="w-[30px] items-center">
                    <item.Icon {...item.iconProps} />
                  </div>
                  <span className=" text-nowrap">{item.title}</span>
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  )
}
