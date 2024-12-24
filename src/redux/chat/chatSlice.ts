import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SchemaConversationResponseDto } from '@/src/types/schema'

interface ChatInitState {
  selectedConversation: SchemaConversationResponseDto | null
  scrollPositions: Record<string, number>
}

const chatInitState: ChatInitState = {
  selectedConversation: null,
  scrollPositions: {},
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
  },
})

export const { selectConversation, setChatScrollPosition } = chatSlice.actions

export const selectSelectedConversation = (state: RootState) =>
  state.chat.selectedConversation

export const selectChatScrollPosition =
  (conversationId: string) => (state: RootState) =>
    state.chat.scrollPositions[conversationId]

export default chatSlice.reducer
