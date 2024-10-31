import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchemaUserPreviewResponseDto } from '../types/schema'
import { RootState } from './store'

interface UserInitialState {
  preview?: SchemaUserPreviewResponseDto
  accessToken?: string
  isAuthenticated: boolean
}

const userInitialState: UserInitialState = {
  isAuthenticated: false,
}

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
      state.isAuthenticated = true
    },
    resetUserState: () => {
      return userInitialState
    },
  },
})

export const { setPreview, setAccessToken, resetUserState } = userSlice.actions

export const selectAccessToken = (state: RootState) => state.user.accessToken
export const selectUserPreview = (state: RootState) => state.user.preview
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated

export default userSlice.reducer
