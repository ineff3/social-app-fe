import { MessageEmojiPopover } from './attachments/MessageEmojiPopover'
import { MessagePictureSelector } from './attachments/MessagePictureSelector'

export const MessageAttachmentOptions = () => {
  return (
    <div className="flex h-full items-center justify-center gap-1 rounded-md border border-accent bg-base-100 px-2 ">
      <MessagePictureSelector />
      {/* <div data-tip="Gif" className=" tooltip tooltip-secondary">
        <button type="button" className=" btn btn-circle btn-ghost btn-sm">
          <GifIcon />
        </button>
      </div> */}
      <MessageEmojiPopover />
    </div>
  )
}
