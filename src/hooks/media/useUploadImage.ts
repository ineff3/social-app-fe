import { SchemaUploadImageResponseDto } from '@/src/generated/schema'
import { apiRoutes } from '@/src/routes'
import { usePost } from '@/src/utils/api/mutations'

export const useUploadImage = () => {
  return usePost<null, FormData, SchemaUploadImageResponseDto>({
    path: apiRoutes.uploadImage,
    axiosOptions: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  })
}
