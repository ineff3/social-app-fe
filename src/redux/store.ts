import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import notificationSlice from './notification/notificationSlice'
import chatSlice from './chat/chatSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    chat: chatSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
