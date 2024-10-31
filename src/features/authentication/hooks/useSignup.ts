import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'
import { ISignupData, IUser } from '../interfaces/'

const useSignup = () => {
  return usePost<ISignupData, ISignupData, IUser>({ path: apiRoutes.signUp })
}
export default useSignup
