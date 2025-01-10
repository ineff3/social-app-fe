import { SelectableComponentProps } from '@/src/common/props'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

type Emoji = {
  native: string
}

const EmojiPicker = ({ onSelect }: SelectableComponentProps<string>) => {
  return (
    <Picker
      emojiSize="22"
      emojiButtonSize="26"
      previewPosition="none"
      theme="dark"
      data={data}
      perLine={8}
      maxFrequentRows={0}
      onEmojiSelect={(emoji?: Emoji) => {
        if (!emoji?.native) return
        onSelect(emoji.native)
      }}
    />
  )
}

export default EmojiPicker
