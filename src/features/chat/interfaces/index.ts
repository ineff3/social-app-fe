import { SchemaMessageResponseDto } from '@/src/types/schema'

export interface ResponseAcknowledgement {
  status: 'success' | 'error'
  message?: string
}

export interface ExtendedChatMessage
  extends Pick<SchemaMessageResponseDto, 'id' | 'text' | 'createdAt'> {
  status: SchemaMessageResponseDto['status'] | 'sending' | 'failed'
}
