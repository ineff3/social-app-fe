import { useAppDispatch } from '@/src/redux/hooks'
import { apiRoutes } from '../../../routes'
import axios from '../../../utils/api/axios'
import { setAccessToken } from '@/src/redux/user/userSlice'
import { SchemaAuthUserResponseDto } from '@/src/types/schema'

const useRefreshToken = () => {
  const dispatch = useAppDispatch()
  const refresh = async () => {
    try {
      const response = await axios
        .get<SchemaAuthUserResponseDto>(apiRoutes.refreshToken, {
          withCredentials: true,
        })
        .then((res) => res.data)
      dispatch(setAccessToken(response.accessToken))
      return response.accessToken
    } catch (err) {
      console.error(err)
    }
  }
  return refresh
}

export default useRefreshToken
