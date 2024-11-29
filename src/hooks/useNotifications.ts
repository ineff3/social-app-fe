import { useEffect } from 'react'
import { socketInstance } from '../utils/api/socketInstance'

const EVENT_NAME = 'notifications'

export const useNotifications = () => {
  useEffect(() => {
    socketInstance.on(EVENT_NAME, (args) => {
      console.log('Go it:')
      console.log(args)
    })

    return () => {
      socketInstance.off(EVENT_NAME)
    }
  }, [])
}
