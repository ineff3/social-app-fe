import { apiRoutes } from '../../../routes'
import { usePost } from '../../../utils/api/mutations'

interface IResponse {
  isReserved: boolean
}
interface IBodyData {
  username: string
}

const useCheckUsername = () => {
  return usePost<null, IBodyData, IResponse>({
    path: apiRoutes.checkUsername,
  })
}

export default useCheckUsername
