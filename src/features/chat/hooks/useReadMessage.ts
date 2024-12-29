import { SchemaReadMessageDto } from '@/src/types/schema'
import { conversationSocketInstance } from '../conversationSocketInstance'

export const useReadMessage = () => {
  const readMessage = (readMessageBody: SchemaReadMessageDto) => {
    conversationSocketInstance.emit('readMessage', readMessageBody)
  }

  return readMessage
}
