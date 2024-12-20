import { io, Socket } from 'socket.io-client'

export const conversationSocketInstance: Socket = io(
  `${import.meta.env.VITE_API_BASE_URL}conversations`,
  {
    autoConnect: false,
  },
)
