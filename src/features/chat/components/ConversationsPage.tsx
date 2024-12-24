import { useSocketConnection } from '@/src/hooks/useSocketConnection'
import { conversationSocketInstance } from '../conversationSocketInstance'
import { ConversationsPanel } from './ConversationsPanel'
import { ConversationContainer } from './ConversationContainer'
import { useEffect } from 'react'
import { useAppDispatch } from '@/src/redux/hooks'
import { selectConversation } from '@/src/redux/chat/chatSlice'

export const ConversationsPage = () => {
  const dispatch = useAppDispatch()
  useSocketConnection(conversationSocketInstance)

  useEffect(() => {
    return () => {
      dispatch(selectConversation(null))
    }
  }, [dispatch])

  return (
    <div className=" flex">
      <ConversationsPanel />
      <ConversationContainer />
    </div>
  )
}
