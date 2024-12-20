import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import { selectAccessToken } from '../redux/user/userSlice'
import { Socket } from 'socket.io-client'

export const useSocketConnection = (socket: Socket) => {
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    if (accessToken) {
      socket.auth = { token: accessToken }
      socket.connect()
    }

    return () => {
      socket.disconnect()
    }
  }, [accessToken, socket])
}
