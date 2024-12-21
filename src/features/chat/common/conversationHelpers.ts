import { SchemaConversationResponseDto } from '@/src/types/schema'

export const retrieveRecipient = (
  conversation: SchemaConversationResponseDto,
  currentUserId: string,
) => {
  return conversation.participants.find(
    (participant) => participant.id !== currentUserId,
  )
}
