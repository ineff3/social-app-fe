import { SchemaConversationResponseDto } from '@/src/generated/schema'

export const retrieveRecipient = (
  conversation: SchemaConversationResponseDto,
  currentUserId: string,
) => {
  return conversation.participants.find(
    (participant) => participant.user.id !== currentUserId,
  )
}
