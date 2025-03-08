import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { EmojiPopoverButton } from './EmojiPopoverButton'
import {
  ComponentWithAnchorProps,
  SelectableComponentProps,
} from '@/src/common/props'
import { lazy, Suspense } from 'react'
import { EmojiFallback } from './EmojiFallback'

const EmojiPicker = lazy(() => import('./EmojiPicker'))

export const EmojiPopover = ({
  onSelect,
  anchor,
}: SelectableComponentProps<string> & ComponentWithAnchorProps) => {
  return (
    <Popover>
      <PopoverButton as={EmojiPopoverButton} />
      <PopoverPanel
        transition
        anchor={anchor}
        className=" z-10 origin-bottom-right transition duration-[0.2s] ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        style={{
          transformOrigin: typeof anchor === 'object' ? anchor.to : 'bottom',
        }}
      >
        <Suspense fallback={<EmojiFallback />}>
          <EmojiPicker onSelect={onSelect} />
        </Suspense>
      </PopoverPanel>
    </Popover>
  )
}
