import { SchemaAuthUserResponseDto } from '@/src/generated/schema'
import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import { ILoginData } from '../interfaces/'

const useLogin = () => {
  return usePost<ILoginData, ILoginData, SchemaAuthUserResponseDto>({
    path: apiRoutes.login,
  })
}

export default useLogin
