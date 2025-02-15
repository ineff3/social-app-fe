import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  ExtendedChatMessage,
  ExtendedChatMessageStatus,
} from '@/src/features/chat/interfaces'

interface ChatInitState {
  selectedConversationId: string | null
  scrollPositions: Record<string, number>
  pendingMessages: Record<string, ExtendedChatMessage[] | undefined>
  typingUsers: Record<string, string[]>
  isNextPageFetchEnabled: boolean
}

const chatInitState: ChatInitState = {
  selectedConversationId: null,
  scrollPositions: {},
  pendingMessages: {},
  typingUsers: {},
  isNextPageFetchEnabled: true,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitState,
  reducers: {
    selectConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversationId = action.payload
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
      state?.pendingMessages[conversationId]?.push(message)
    },
    removePendingChatMessage: (
      state,
      action: PayloadAction<{ conversationId: string; messageId: string }>,
    ) => {
      const { conversationId, messageId } = action.payload
      if (state.pendingMessages[conversationId]) {
        state.pendingMessages[conversationId] = state?.pendingMessages[
          conversationId
        ]?.filter((message) => message.id !== messageId)
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
        state.pendingMessages[conversationId] = state?.pendingMessages[
          conversationId
        ]?.map((message) =>
          message.id === messageId ? { ...message, status } : message,
        )
      }
    },
    addTypingUser: (
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>,
    ) => {
      const { conversationId, userId } = action.payload
      const existing = state.typingUsers[action.payload.conversationId]
      if (existing) {
        state.typingUsers[conversationId].push(userId)
      } else {
        state.typingUsers[conversationId] = [userId]
      }
    },
    removeTypingUser: (
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>,
    ) => {
      const { conversationId, userId } = action.payload
      const existing = state.typingUsers[action.payload.conversationId]
      if (existing) {
        state.typingUsers[conversationId] = state.typingUsers[
          conversationId
        ].filter((id) => id !== userId)
      }
    },
    setIsNextPageFetchEnabled: (state, action: PayloadAction<boolean>) => {
      state.isNextPageFetchEnabled = action.payload
    },
  },
})

export const {
  selectConversation,
  setChatScrollPosition,
  addPendingChatMessage,
  removePendingChatMessage,
  updatePendingMessageStatus,
  addTypingUser,
  removeTypingUser,
  setIsNextPageFetchEnabled,
} = chatSlice.actions

export const selectSelectedConversationId = (state: RootState) =>
  state.chat.selectedConversationId

export const selectChatScrollPosition =
  (conversationId: string) => (state: RootState) =>
    state.chat.scrollPositions[conversationId]

export const selectPendingMessages =
  (conversationId: string) => (state: RootState) =>
    state.chat.pendingMessages[conversationId]

export const selectTypingUser =
  (conversationId: string) => (state: RootState) =>
    state.chat.typingUsers[conversationId]

export const selectIsNextPageFetchEnabled = (state: RootState) =>
  state.chat.isNextPageFetchEnabled

export default chatSlice.reducer
