import { SchemaCreateMessageDto } from '@/src/generated/schema'
import { MessageFormType } from '../interfaces'

export const transformMessageData = (
  data: MessageFormType,
  conversationId: string,
): SchemaCreateMessageDto => {
  return {
    ...data,
    conversationId,
    imageKeys: data.messageImages.map((messageImage) => messageImage.imageKey!),
  }
}
