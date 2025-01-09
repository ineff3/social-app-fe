import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { ConversationUserPreview } from './ConversationUserPreview'
import { useRef } from 'react'
import { MessageFlow } from './MessageFlow'
import { MessageInputForm } from '../send-message-form/MessageInputForm'
import { useChatRoomSubscription } from '../../hooks/useChatRoomSubscription'
import { useTriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'
import { useHandleReadMessage } from '../../hooks/useHandleReadMessage'
import { ScrollToBottomBadge } from './ScrollToBottomBadge'
import { CircleButton } from '@/src/components/ui/CircleButton'
import { selectConversation } from '@/src/redux/chat/chatSlice'
import ArrowIconSvg from '@/src/components/ui/icons/ArrowIconSvg'

interface Props {
  conversation: SchemaConversationResponseDto
}

export const Conversation = ({ conversation }: Props) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const triggerScrollToBottom = useTriggerScrollToBottom(scrollElementRef)

  useChatRoomSubscription(conversation.id)
  useHandleReadMessage(conversation.id)

  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <div className="flex h-full w-full max-w-[700px] flex-grow flex-col lg:max-w-[600px]">
      <header className="fixed top-0 z-10 flex h-[60px] w-full max-w-[inherit] items-center gap-1 border-b border-r border-accent bg-base-100 px-4">
        <div className="lg:hidden">
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
        </div>
        <p className="p-4 text-lg font-bold text-secondary">
          {recipient?.user.firstName}
        </p>
      </header>
      <div
        ref={scrollElementRef}
        className="mt-[60px] flex h-full flex-col overflow-y-auto border-b border-accent"
      >
        <ConversationUserPreview userPreview={recipient.user} />
        <MessageFlow
          conversationId={conversation.id}
          recipient={recipient}
          scrollElementRef={scrollElementRef}
          triggerScrollToBottom={triggerScrollToBottom}
        />
        <ScrollToBottomBadge
          scrollElementRef={scrollElementRef}
          conversation={conversation}
          triggerScrollToBottom={triggerScrollToBottom}
        />
      </div>
      <MessageInputForm triggerScrollToBottom={triggerScrollToBottom} />
    </div>
  )
}
