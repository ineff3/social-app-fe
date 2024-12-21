import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { ConversationUserPreview } from './ConversationUserPreview'
import { StickyHeader } from '@/src/components/ui/StickyHeader'
import { useRef } from 'react'

interface Props {
  conversation: SchemaConversationResponseDto
}

export const Conversation = ({ conversation }: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const recipient = retrieveRecipient(conversation, currentUserId)!
  const scrollElementRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col overflow-y-auto" ref={scrollElementRef}>
      <StickyHeader scrolledElementRef={scrollElementRef}>
        <div className="p-4 text-lg font-bold text-secondary">
          {recipient?.firstName}
        </div>
      </StickyHeader>
      <ConversationUserPreview userPreview={recipient} />
    </div>
  )
}
