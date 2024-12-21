import { useSocketConnection } from '@/src/hooks/useSocketConnection'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { ConversationsPanel } from './ConversationsPanel'
import { ConversationContainer } from './ConversationContainer'

export const ConversationsPage = () => {
  useSocketConnection(conversationSocketInstance)

  return (
    <div className=" flex">
      <ConversationsPanel />
      <ConversationContainer />
    </div>
  )
}
