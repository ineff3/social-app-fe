import { useEffect } from 'react'
import axiosInstance, { instance } from '../utils/api/axiosInstances'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectAccessToken, setAuthData } from '../redux/user/userSlice'
import { SchemaAuthUserResponseDto } from '../generated/schema'
import { apiRoutes } from '../routes'

const useAxiosInstance = () => {
  const accessToken = useAppSelector(selectAccessToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const refreshToken = async () => {
      return axiosInstance
        .get<SchemaAuthUserResponseDto>(apiRoutes.refreshToken, {
          withCredentials: true,
        })
        .then((res) => res.data)
    }

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
        const prevRequest = error?.config
        if (
          error?.response?.status === 401 &&
          !prevRequest?.alreadySent &&
          prevRequest?.url !== apiRoutes.refreshToken
        ) {
          prevRequest.alreadySent = true
          try {
            const data = await refreshToken()
            dispatch(setAuthData(data))
            prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
            return instance(prevRequest)
          } catch (error) {
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      instance.interceptors.request.eject(requestIntercept)
      instance.interceptors.response.eject(responseIntercept)
    }
  }, [accessToken, dispatch])

  return instance
}

export default useAxiosInstance
