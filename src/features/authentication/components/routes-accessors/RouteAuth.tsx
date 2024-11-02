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
import { useEffect, useState } from 'react'
import { pageRoutes } from '@/src/routes'

export const RouteAuth = ({ required = false }: { required?: boolean }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const location = useLocation()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isPersistAuth = !!localStorage.getItem(PERSIST_AUTH_KEY)

  const queryKeyStore = useQueryKeyStore()
  const { data, isFetched, isPending, isFetching } = useQuery({
    ...queryKeyStore.auth.refreshToken,
    enabled: !isAuthenticated && isPersistAuth,
  })

  useEffect(
    function syncAuthentication() {
      if (data) {
        dispatch(setAccessToken(data.accessToken))
      }
    },
    [dispatch, data],
  )

  useEffect(
    function syncLoading() {
      const isRefetchDisabled = isPending && !isFetching
      if (isAuthenticated) {
        setIsAuthLoading(false)
      } else {
        if (isFetched || isRefetchDisabled) {
          setIsAuthLoading(false)
        }
      }
    },
    [isAuthenticated, isFetched, isPending, isFetching],
  )

  if (isAuthLoading) {
    return <LoadingSpinner />
  }

  if (required) {
    return (
      <>
        {isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to={pageRoutes.auth} replace state={{ from: location }} />
        )}
      </>
    )
  }

  return <>{isAuthenticated ? <Navigate to={pageRoutes.home} /> : <Outlet />}</>
}
