import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import postCreationSlice from './post-creation/postCreationSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    postCreation: postCreationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
