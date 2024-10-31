import { useEffect } from 'react'
import { useRefreshToken } from '../features/authentication'
import { instance } from '../utils/api/axios'
import { useAppSelector } from '../redux/hooks'
import { selectAccessToken } from '../redux/user/userSlice'

const useAxiosInstance = () => {
  const refresh = useRefreshToken()
  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // if accessToken expired we are trying to attach a new one created by refresh function
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return instance(prevRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      instance.interceptors.request.eject(requestIntercept)
      instance.interceptors.response.eject(responseIntercept)
    }
  }, [accessToken, refresh])

  return instance
}

export default useAxiosInstance
