import { GifIcon, ImageIcon, SmileIcon } from '@/src/components/ui/icons'

export const MessageAttachmentOptions = () => {
  return (
    <div className="flex h-full items-center justify-center gap-1 rounded-md border border-primary bg-base-100 px-2 ">
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
      <div data-tip="Emoji" className=" tooltip tooltip-secondary">
        <button type="button" className="btn btn-circle btn-ghost btn-sm p-0.5">
          <SmileIcon />
        </button>
      </div>
    </div>
  )
}
