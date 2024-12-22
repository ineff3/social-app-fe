import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { ConversationUserPreview } from './ConversationUserPreview'
import { StickyHeader } from '@/src/components/ui/StickyHeader'
import { useRef } from 'react'
import { MessageFlow } from './MessageFlow'
import { MessageInputForm } from '../send-message-form/MessageInputForm'
import { useChatRoomSubscription } from '../../hooks/useChatRoomSubscription'

interface Props {
  conversation: SchemaConversationResponseDto
}

export const Conversation = ({ conversation }: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const recipient = retrieveRecipient(conversation, currentUserId)!
  const scrollElementRef = useRef<HTMLDivElement>(null)

  useChatRoomSubscription(conversation.id)

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
        <MessageFlow conversationId={conversation.id} recipient={recipient} />
      </div>
      <MessageInputForm />
    </div>
  )
}
