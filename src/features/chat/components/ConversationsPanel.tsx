import React from 'react'
import { ConversationList } from './conversation-list/ConversationList'

export const ConversationsPanel = () => {
  return (
    <div className=" flex min-h-screen w-full max-w-[420px] flex-col gap-5 border-r border-accent py-4">
      <p className=" px-3 text-lg  text-secondary">Messages</p>
      <ConversationList />
    </div>
  )
}
