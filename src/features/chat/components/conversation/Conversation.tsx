import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { ConversationUserPreview } from './ConversationUserPreview'
import { StickyHeader } from '@/src/components/ui/StickyHeader'
import { useRef, useState } from 'react'
import { MessageFlow } from './MessageFlow'
import { MessageInputForm } from '../send-message-form/MessageInputForm'
import { useChatRoomSubscription } from '../../hooks/useChatRoomSubscription'
import { PendingMessageType } from '../../interfaces'
import { useTriggerScrollToBottom } from '../../hooks/useTriggerScrollToBottom'

interface Props {
  conversation: SchemaConversationResponseDto
}

export const Conversation = ({ conversation }: Props) => {
  const [pendingMessages, setPendingMessages] = useState<PendingMessageType[]>(
    [],
  )
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const triggerScrollToBottom = useTriggerScrollToBottom(scrollElementRef)

  useChatRoomSubscription(conversation.id)

  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollElementRef}
        className="flex h-full flex-col overflow-y-auto border-b border-accent"
      >
        <StickyHeader scrolledElementRef={scrollElementRef}>
          <div className="p-4 text-lg font-bold text-secondary">
            {recipient?.user.firstName}
          </div>
        </StickyHeader>
        <ConversationUserPreview userPreview={recipient.user} />
        <MessageFlow
          conversationId={conversation.id}
          recipient={recipient}
          scrollElementRef={scrollElementRef}
          pendingMessages={pendingMessages}
        />
      </div>
      <MessageInputForm
        scrollElementRef={scrollElementRef}
        setPendingMessages={setPendingMessages}
        triggerScrollToBottom={triggerScrollToBottom}
      />
    </div>
  )
}
