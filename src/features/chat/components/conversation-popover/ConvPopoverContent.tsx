import { useAppSelector } from '@/src/redux/hooks'
import { ConversationList } from '../conversation-list/ConversationList'
import { selectSelectedConversationId } from '@/src/redux/chat/chatSlice'
import { PopoverConversation } from './PopoverConversation'
import { CONV_POPOVER_HEADER_HEIGHT } from '../../constants'
import { toPx } from '@/src/common/converters/toPx'

const CONTENT_HEIGHT = 500

interface Props {
  isOpen: boolean
  onToggle: () => void
}

export const ConvPopoverContent = ({ isOpen, onToggle }: Props) => {
  const selectedConversationId = useAppSelector(selectSelectedConversationId)

  return (
    <div
      className="overflow-hidden rounded-t-xl transition-all duration-200 ease-in-out"
      style={{
        height: isOpen
          ? `${selectedConversationId ? toPx(CONTENT_HEIGHT + CONV_POPOVER_HEADER_HEIGHT) : toPx(CONTENT_HEIGHT)}`
          : '0px',
      }}
    >
      {isOpen &&
        (!selectedConversationId ? (
          <ConversationList />
        ) : (
          <PopoverConversation
            conversationId={selectedConversationId}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        ))}
    </div>
  )
}
