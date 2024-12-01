import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface NotificationInitState {
  incomingNotificationsCount: number
}

const notificationInitState: NotificationInitState = {
  incomingNotificationsCount: 0,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitState,
  reducers: {
    addIncomingNotification: (state) => {
      state.incomingNotificationsCount++
    },
    resetIncomingNotifications: (state) => {
      state.incomingNotificationsCount = 0
    },
  },
})

export const { addIncomingNotification, resetIncomingNotifications } =
  notificationSlice.actions

export const selectIncNotificationsCount = (state: RootState) =>
  state.notification.incomingNotificationsCount

export default notificationSlice.reducer
