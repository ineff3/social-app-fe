import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SignupInitialState {
  username?: string
  isLoading: boolean
}

const signupInitialState: SignupInitialState = {
  isLoading: false,
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState: signupInitialState,
  reducers: {
    setSignupLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setSignupUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
  },
})

export const { setSignupLoading, setSignupUsername } = signupSlice.actions

export const selectSignupUsername = (state: RootState) => state.signup.username
export const selectSignupLoading = (state: RootState) => state.signup.isLoading

export default signupSlice.reducer
