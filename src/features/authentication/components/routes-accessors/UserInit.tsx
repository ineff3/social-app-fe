import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '@/src/redux/hooks'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { setPreview } from '@/src/redux/user/userSlice'
import { useEffect } from 'react'
import { useNotifications } from '@/src/hooks/useNotifications'
import { useSocketConnection } from '@/src/hooks/useSocketConnection'
import { socketInstance } from '@/src/utils/api/socketInstance'
import { conversationSocketInstance } from '@/src/features/chat/conversationSocketInstance'
import { FullScreenSpinner } from '@/src/components/ui/spinners/FullScreenSpinner'

export const UserInit = () => {
  const dispatch = useAppDispatch()
  const queryKeyStore = useQueryKeyStore()
  const { data, isLoading, isSuccess } = useQuery({
    ...queryKeyStore.users.currentUserPreview,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPreview(data))
    }
  }, [isSuccess, dispatch, data])

  useSocketConnection(socketInstance)
  useSocketConnection(conversationSocketInstance)
  useNotifications()

  return <>{isLoading ? <FullScreenSpinner /> : <Outlet />}</>
}
