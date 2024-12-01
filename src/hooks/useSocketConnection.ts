import { useEffect } from 'react'
import { socketInstance } from '../utils/api/socketInstance'
import { useAppSelector } from '../redux/hooks'
import { selectAccessToken } from '../redux/user/userSlice'

export const useSocketConnection = () => {
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    if (accessToken) {
      socketInstance.auth = { token: accessToken }
      socketInstance.connect()
    }

    return () => {
      socketInstance.disconnect()
    }
  }, [accessToken])
}
