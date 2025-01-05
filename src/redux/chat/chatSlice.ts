import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SchemaConversationResponseDto } from '@/src/types/schema'
import {
  ExtendedChatMessage,
  ExtendedChatMessageStatus,
} from '@/src/features/chat/interfaces'

interface ChatInitState {
  selectedConversation: SchemaConversationResponseDto | null
  scrollPositions: Record<string, number>
  pendingMessages: Record<string, ExtendedChatMessage[] | undefined>
  onlineUsers: string[]
}

const chatInitState: ChatInitState = {
  selectedConversation: null,
  scrollPositions: {},
  pendingMessages: {},
  onlineUsers: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitState,
  reducers: {
    selectConversation: (
      state,
      action: PayloadAction<SchemaConversationResponseDto | null>,
    ) => {
      state.selectedConversation = action.payload
    },
    setChatScrollPosition: (
      state,
      action: PayloadAction<Record<string, number>>,
    ) => {
      state.scrollPositions = { ...state.scrollPositions, ...action.payload }
    },
    addPendingChatMessage: (
      state,
      action: PayloadAction<{
        conversationId: string
        message: ExtendedChatMessage
      }>,
    ) => {
      const { conversationId, message } = action.payload
      if (!state.pendingMessages[conversationId]) {
        state.pendingMessages[conversationId] = []
      }
      state.pendingMessages[conversationId].push(message)
    },
    removePendingChatMessage: (
      state,
      action: PayloadAction<{ conversationId: string; messageId: string }>,
    ) => {
      const { conversationId, messageId } = action.payload
      if (state.pendingMessages[conversationId]) {
        state.pendingMessages[conversationId] = state.pendingMessages[
          conversationId
        ].filter((message) => message.id !== messageId)
      }
    },
    updatePendingMessageStatus: (
      state,
      action: PayloadAction<{
        conversationId: string
        messageId: string
        status: ExtendedChatMessageStatus
      }>,
    ) => {
      const { conversationId, messageId, status } = action.payload
      if (state.pendingMessages[conversationId]) {
        state.pendingMessages[conversationId] = state.pendingMessages[
          conversationId
        ].map((message) =>
          message.id === messageId ? { ...message, status } : message,
        )
      }
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload
    },
  },
})

export const {
  selectConversation,
  setChatScrollPosition,
  addPendingChatMessage,
  removePendingChatMessage,
  updatePendingMessageStatus,
  setOnlineUsers,
} = chatSlice.actions

export const selectSelectedConversation = (state: RootState) =>
  state.chat.selectedConversation

export const selectChatScrollPosition =
  (conversationId: string) => (state: RootState) =>
    state.chat.scrollPositions[conversationId]

export const selectPendingMessages =
  (conversationId: string) => (state: RootState) =>
    state.chat.pendingMessages[conversationId]

export const selectOnlineUsers = (state: RootState) => state.chat.onlineUsers

export default chatSlice.reducer
