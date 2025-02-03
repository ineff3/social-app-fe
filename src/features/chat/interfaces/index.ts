import {
  SchemaMessageResponseDto,
  SchemaUploadImageResponseDto,
} from '@/src/generated/schema'

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
    'id' | 'text' | 'createdAt' | 'conversationId' | 'messageImages'
  > {
  status: ExtendedChatMessageStatus
}

export interface MessagePicture {
  id?: string
  key: string
  file: File
  uploadData?: SchemaUploadImageResponseDto
}
export interface MessageFormType {
  text: string
  messageImages: MessagePicture[]
}
