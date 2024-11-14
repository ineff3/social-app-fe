import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '@/src/redux/hooks'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { setPreview } from '@/src/redux/user/userSlice'
import { useEffect } from 'react'
import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner'

const UserFetch = () => {
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

  return <>{isLoading ? <LoadingSpinner /> : <Outlet />}</>
}

export default UserFetch
