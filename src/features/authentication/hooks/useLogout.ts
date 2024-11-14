import { useQueryClient } from '@tanstack/react-query'
import { apiRoutes } from '../../../routes'
import axios from '../../../utils/api/axiosInstances'
import { PERSIST_AUTH_KEY } from '../constants'
import { useAppDispatch } from '@/src/redux/hooks'
import { resetUserState } from '@/src/redux/user/userSlice'

const useLogout = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const logout = async () => {
    dispatch(resetUserState())
    localStorage.removeItem(PERSIST_AUTH_KEY)
    try {
      await axios.get(apiRoutes.logout, {
        withCredentials: true,
      })
      await queryClient.invalidateQueries()
    } catch (err) {
      console.log(err)
    }
  }
  return logout
}

export default useLogout
