import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  selectIsAuthenticated,
  setAccessToken,
} from '@/src/redux/user/userSlice'
import { PERSIST_AUTH_KEY } from '../../constants'
import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useEffect } from 'react'
import { pageRoutes } from '@/src/routes'

export const RouteAuth = ({ required = false }: { required?: boolean }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const queryKeyStore = useQueryKeyStore()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isPersistAuth = localStorage.getItem(PERSIST_AUTH_KEY)
  const { data, isLoading, isSuccess } = useQuery({
    ...queryKeyStore.auth.refreshToken,
    enabled: !isAuthenticated && !!isPersistAuth,
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAccessToken(data.accessToken))
    }
  }, [isSuccess, dispatch, data])

  if (required) {
    return (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to={pageRoutes.auth} replace state={{ from: location }} />
        )}
      </>
    )
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isAuthenticated ? (
        <Navigate to={pageRoutes.home} />
      ) : (
        <Outlet />
      )}
    </>
  )
}
