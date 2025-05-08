import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  SchemaAuthUserResponseDto,
  SchemaUserPreviewResponseDto,
} from '../../generated/schema'
import { RootState } from '../store'

const scrollPositions = {
  mainContext: 0,
  followingContext: 0,
  bookmarksContext: 0,
}

type ScrollPositions = typeof scrollPositions

export type ScrollPositionKey = keyof ScrollPositions

interface UserInitialState {
  preview?: SchemaUserPreviewResponseDto
  authData?: SchemaAuthUserResponseDto
  isAuthenticated: boolean
  scrollPositions: ScrollPositions
}

const userInitialState: UserInitialState = {
  isAuthenticated: false,
  scrollPositions,
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
    setAuthData: (state, action: PayloadAction<SchemaAuthUserResponseDto>) => {
      state.authData = action.payload
      state.isAuthenticated = true
    },
    resetUserState: () => {
      return userInitialState
    },
    setScrollPosition: (
      state,
      action: PayloadAction<Record<ScrollPositionKey, number>>,
    ) => {
      state.scrollPositions = { ...state.scrollPositions, ...action.payload }
    },
  },
})

export const { setPreview, resetUserState, setScrollPosition, setAuthData } =
  userSlice.actions

export const selectAccessToken = (state: RootState) =>
  state.user.authData?.accessToken
export const selectPermissions = (state: RootState) =>
  state.user.authData?.permissions
export const selectUserPreview = (state: RootState) => state.user.preview
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectScrollPositions = (state: RootState) =>
  state.user.scrollPositions

export default userSlice.reducer
