import { useEffect } from 'react'
import { socketInstance } from '../utils/api/socketInstance'
import { useAppDispatch } from '../redux/hooks'
import { addIncomingNotification } from '../redux/notification/notificationSlice'

const EVENT_NAME = 'notifications'

export const useNotifications = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    socketInstance.on(EVENT_NAME, () => {
      dispatch(addIncomingNotification())
    })

    return () => {
      socketInstance.off(EVENT_NAME)
    }
  }, [dispatch])
}
