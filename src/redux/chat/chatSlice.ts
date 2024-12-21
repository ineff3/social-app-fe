import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SchemaConversationResponseDto } from '@/src/types/schema'

interface ChatInitState {
  selectedConversation: SchemaConversationResponseDto | null
}

const chatInitState: ChatInitState = {
  selectedConversation: null,
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
  },
})

export const { selectConversation } = chatSlice.actions

export const selectSelectedConversation = (state: RootState) =>
  state.chat.selectedConversation

export default chatSlice.reducer
