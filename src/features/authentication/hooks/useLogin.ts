import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import { ILoginData, ILoginResponse } from '../interfaces/'

const useLogin = () => {
  return usePost<ILoginData, ILoginData, ILoginResponse>({
    path: apiRoutes.login,
  })
}

export default useLogin
