import { useAppSelector } from '@/src/redux/hooks'
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

interface Props {
  conversation: SchemaConversationResponseDto
}

export const Conversation = ({ conversation }: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const triggerScrollToBottom = useTriggerScrollToBottom(scrollElementRef)

  useChatRoomSubscription(conversation.id)
  useHandleReadMessage(conversation.id)

  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <div className="flex h-full flex-col">
      <header className="fixed top-0 z-10 h-[60px] w-full max-w-[600px] border-b border-r border-accent bg-base-100">
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
      </div>
      <MessageInputForm triggerScrollToBottom={triggerScrollToBottom} />
    </div>
  )
}
