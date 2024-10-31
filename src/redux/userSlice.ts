import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchemaUserPreviewResponseDto } from '../types/schema'
import { RootState } from './store'

interface UserInitialState {
  preview?: SchemaUserPreviewResponseDto
  accessToken?: string
}

const userInitialState: UserInitialState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setPreview: (
      state,
      action: PayloadAction<SchemaUserPreviewResponseDto>,
    ) => {
      state.preview = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    resetState: (state) => {
      return state
    },
  },
})

export const { setPreview, setAccessToken, resetState } = userSlice.actions

export const selectAccessToken = (state: RootState) => state.user.accessToken
export const selectUserPreview = (state: RootState) => state.user.preview

export default userSlice.reducer
