import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { selectIsAuthenticated, setAuthData } from '@/src/redux/user/userSlice'
import { PERSIST_AUTH_KEY } from '../../constants'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useEffect, useState } from 'react'
import { pageRoutes } from '@/src/routes'
import { FullScreenSpinner } from '@/src/components/ui/spinners/FullScreenSpinner'

export const RouteAuth = ({ required = false }: { required?: boolean }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const location = useLocation()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const localStoragePersist = localStorage.getItem(PERSIST_AUTH_KEY)
  const isPersistAuth = localStoragePersist
    ? localStoragePersist === 'true'
    : true

  const queryKeyStore = useQueryKeyStore()
  const { data, isFetched, isPending, isFetching } = useQuery({
    ...queryKeyStore.auth.refreshToken,
    enabled: !isAuthenticated && isPersistAuth,
  })

  useEffect(
    function syncAuthentication() {
      if (data) {
        dispatch(setAuthData(data))
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
    return <FullScreenSpinner />
  }

  if (required) {
    if (!isAuthenticated) {
      localStorage.removeItem(PERSIST_AUTH_KEY)
    }
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={pageRoutes.auth} replace state={{ from: location }} />
    )
  }
  return <Outlet />
}
