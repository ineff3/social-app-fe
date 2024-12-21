import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import { retrieveRecipient } from '../../common/conversationHelpers'
import { ConversationUserPreview } from './ConversationUserPreview'

interface Props {
  conversation: SchemaConversationResponseDto
}

export const Conversation = ({ conversation }: Props) => {
  const currentUserId = useAppSelector(selectUserPreview)!.id
  const recipient = retrieveRecipient(conversation, currentUserId)!

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="p-4 text-lg font-bold text-secondary">
        {recipient?.firstName}
      </div>
      <ConversationUserPreview userPreview={recipient} />
    </div>
  )
}
