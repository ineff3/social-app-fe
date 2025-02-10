import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { ConversationHeaderProps } from '../../interfaces'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { selectConversation } from '@/src/redux/chat/chatSlice'
import { CircleButton } from '@/src/components/ui/buttons/CircleButton'
import ArrowIconSvg from '@/src/components/ui/icons/ArrowIconSvg'
import { CircleToggleButton } from './CircleToggleButton'
import { toPx } from '@/src/common/converters/toPx'
import { CONV_POPOVER_HEADER_HEIGHT } from '../../constants'

interface Props extends ConversationHeaderProps {
  isOpen: boolean
  onToggle: () => void
}

export const PopoverConversationHeader = ({
  conversation,
  isOpen,
  onToggle,
}: Props) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectUserPreview)!.id

  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <header
      className="flex w-full items-center justify-between gap-1 border-b border-r border-accent bg-base-100 px-4"
      style={{ maxHeight: toPx(CONV_POPOVER_HEADER_HEIGHT) }}
    >
      <div className="flex items-center">
        <CircleButton
          onClick={() => {
            dispatch(selectConversation(null))
          }}
          label="Back"
          tooltipPosition="bottom"
          size="sm"
        >
          <ArrowIconSvg width={15} height={15} className="fill-secondary" />
        </CircleButton>
        <p className="p-4 text-lg font-bold text-secondary">
          {recipient?.user.firstName}
        </p>
      </div>
      <CircleToggleButton isOpen={isOpen} onToggle={onToggle} />
    </header>
  )
}
