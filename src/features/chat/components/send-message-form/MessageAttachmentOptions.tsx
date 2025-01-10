import { EmojiPopover } from '@/src/components/emoji/EmojiPopover'
import { GifIcon, ImageIcon } from '@/src/components/ui/icons'

interface Props {
  handleEmojiSelect: (emoji: string) => void
}

export const MessageAttachmentOptions = ({ handleEmojiSelect }: Props) => {
  return (
    <div className="flex h-full items-center justify-center gap-1 rounded-md border border-accent bg-base-100 px-2 ">
      <div data-tip="Media" className=" tooltip tooltip-secondary">
        <button type="button" className={` btn btn-circle btn-ghost btn-sm`}>
          <ImageIcon />
        </button>
      </div>
      <div data-tip="Gif" className=" tooltip tooltip-secondary">
        <button type="button" className=" btn btn-circle btn-ghost btn-sm">
          <GifIcon />
        </button>
      </div>
      <EmojiPopover
        onSelect={handleEmojiSelect}
        anchor={{ gap: 5, to: 'bottom' }}
      />
    </div>
  )
}
