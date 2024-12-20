import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ChatInitState {
  selectedConversation: string | null
}

const chatInitState: ChatInitState = {
  selectedConversation: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitState,
  reducers: {
    selectConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversation = action.payload
    },
  },
})

export const { selectConversation } = chatSlice.actions

export const selectSelectedConversation = (state: RootState) =>
  state.chat.selectedConversation

export default chatSlice.reducer
