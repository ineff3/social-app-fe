import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/generated/schema'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { ConversationUserPreview } from './ConversationUserPreview'
import { useRef } from 'react'
import { MessageFlow } from './MessageFlow'
import { MessageInputForm } from '../send-message-form/MessageInputForm'
import { useChatRoomSubscription } from '../../hooks/useChatRoomSubscription'
import { useTriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'
import { useHandleReadMessage } from '../../hooks/useHandleReadMessage'
import { ScrollToBottomBadge } from './ScrollToBottomBadge'
import { MessageFormProvider } from '../../contexts/MessageFormContext'

interface Props {
  conversation: SchemaConversationResponseDto
  Header: React.ReactNode
  isMinimized?: boolean
}

export const Conversation = ({
  conversation,
  isMinimized = false,
  Header,
}: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const triggerScrollToBottom = useTriggerScrollToBottom(scrollElementRef)

  useChatRoomSubscription(conversation.id)
  useHandleReadMessage(conversation.id)

  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <div className="flex h-full w-full max-w-[700px] flex-grow flex-col lg:max-w-[600px]">
      {Header}
      <div
        ref={scrollElementRef}
        className="flex h-full flex-col overflow-y-auto border-b border-accent"
      >
        <ConversationUserPreview userPreview={recipient.user} />
        <MessageFlow
          conversationId={conversation.id}
          recipient={recipient}
          scrollElementRef={scrollElementRef}
          triggerScrollToBottom={triggerScrollToBottom}
          isMinimized={isMinimized}
        />
        <ScrollToBottomBadge
          scrollElementRef={scrollElementRef}
          conversation={conversation}
          triggerScrollToBottom={triggerScrollToBottom}
        />
      </div>
      <MessageFormProvider>
        <MessageInputForm
          triggerScrollToBottom={triggerScrollToBottom}
          isMinimized={isMinimized}
        />
      </MessageFormProvider>
    </div>
  )
}
