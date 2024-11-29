import { io, Socket } from 'socket.io-client'

export const socketInstance: Socket = io(import.meta.env.VITE_API_BASE_URL, {
  autoConnect: false,
})
