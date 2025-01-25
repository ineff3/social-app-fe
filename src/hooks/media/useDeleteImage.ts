import { apiRoutes } from '@/src/routes'
import { useDelete } from '@/src/utils/api/mutations'

export const useDeleteImage = () => {
  return useDelete({ path: apiRoutes.deleteImage })
}
