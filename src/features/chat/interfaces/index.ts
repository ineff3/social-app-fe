import { SchemaMessageResponseDto } from '@/src/types/schema'

export interface ResponseAcknowledgement {
  status: 'success' | 'error'
  message?: string
}

export type ExtendedChatMessageStatus =
  | SchemaMessageResponseDto['status']
  | 'sending'
  | 'failed'
export interface ExtendedChatMessage
  extends Pick<
    SchemaMessageResponseDto,
    'id' | 'text' | 'createdAt' | 'conversationId'
  > {
  status: ExtendedChatMessageStatus
}
