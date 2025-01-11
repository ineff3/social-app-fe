import { SchemaAuthUserResponseDto } from '@/src/generated/schema'
import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import { ISignupData } from '../interfaces/'

export const useSignup = () => {
  return usePost<ISignupData, ISignupData, SchemaAuthUserResponseDto>({
    path: apiRoutes.signUp,
  })
}
