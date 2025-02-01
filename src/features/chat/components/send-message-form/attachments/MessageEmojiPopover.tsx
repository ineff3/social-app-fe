import { EmojiPopover } from '@/src/components/emoji/EmojiPopover'
import { useMessageFormContext } from '../../../contexts/MessageFormContext'

export const MessageEmojiPopover = () => {
  const { getValues, setValue, caretPosition, setCaretPosition } =
    useMessageFormContext()!

  const handleEmojiSelect = (emoji: string) => {
    const text = getValues('text')
    const newText =
      text.slice(0, caretPosition) + emoji + text.slice(caretPosition)
    setValue('text', newText, { shouldDirty: true })
    setCaretPosition((prev) => prev + emoji.length)
  }

  return (
    <EmojiPopover
      onSelect={handleEmojiSelect}
      anchor={{ gap: 5, to: 'bottom' }}
    />
  )
}
