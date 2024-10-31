/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { pageRoutes } from '../../../../routes'
import { useAppSelector } from '@/src/redux/hooks'
import { selectIsAuthenticated } from '@/src/redux/user/userSlice'
import { PERSIST_AUTH_KEY } from '../../constants'
import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner'

const PersistLogin = ({ required = false }: { required?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const refresh = useRefreshToken()
  const location = useLocation()
  const isPersistAuth = localStorage.getItem(PERSIST_AUTH_KEY)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    !isAuthenticated && isPersistAuth
      ? verifyRefreshToken()
      : setIsLoading(false)
  }, [])

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

export default PersistLogin
