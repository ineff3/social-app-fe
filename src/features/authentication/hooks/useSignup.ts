import { SchemaAuthUserResponseDto } from '@/src/types/schema'
import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import { ISignupData } from '../interfaces/'

const useSignup = () => {
  return usePost<ISignupData, ISignupData, SchemaAuthUserResponseDto>({
    path: apiRoutes.signUp,
  })
}
export default useSignup
