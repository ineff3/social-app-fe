import { useSocketConnection } from '@/src/hooks/useSocketConnection'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { ConversationsPanel } from './ConversationsPanel'
import { Conversation } from './Conversation'

export const ConversationsPage = () => {
  useSocketConnection(conversationSocketInstance)

  return (
    <div className=" flex">
      <ConversationsPanel />
      <Conversation />
    </div>
  )
}
