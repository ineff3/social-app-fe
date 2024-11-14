/* eslint-disable @typescript-eslint/no-explicit-any */
import { SmileIcon } from '@/src/components/ui/icons'
import Modal from '@/src/components/ui/Modal'
import { useModal } from '@/src/hooks/useModal'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const AttachEmoji = ({
  appendEmoji,
}: {
  appendEmoji: (emoji: any) => void
}) => {
  const { show, close, visible } = useModal()

  const handleEmojiSelect = (emoji: any) => {
    appendEmoji(emoji)
  }

  return (
    <div>
      <button
        onClick={show}
        type="button"
        className="btn btn-circle btn-ghost btn-sm p-0.5"
      >
        <SmileIcon />
      </button>
      <Modal isOpen={visible} close={close} asWindow={false}>
        <div className=" max-h-[260px] overflow-hidden">
          <Picker
            emojiSize="18"
            emojiButtonSize="24"
            previewPosition="none"
            theme="dark"
            data={data}
            onEmojiSelect={handleEmojiSelect}
            perLine={8}
            maxFrequentRows={0}
          />
        </div>
      </Modal>
    </div>
  )
}
