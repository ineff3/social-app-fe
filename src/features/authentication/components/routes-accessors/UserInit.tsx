import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { selectUserPreview, setPreview } from '@/src/redux/user/userSlice'
import { useEffect } from 'react'
import { useNotifications } from '@/src/hooks/useNotifications'
import { useSocketConnection } from '@/src/hooks/useSocketConnection'
import { socketInstance } from '@/src/utils/api/socketInstance'
import { conversationSocketInstance } from '@/src/features/chat/conversationSocketInstance'
import { FullScreenSpinner } from '@/src/components/ui/spinners/FullScreenSpinner'

export const UserInit = () => {
  const dispatch = useAppDispatch()
  const hasUserPreview = useAppSelector(selectUserPreview)
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

  return isLoading || !hasUserPreview ? <FullScreenSpinner /> : <Outlet />
}
