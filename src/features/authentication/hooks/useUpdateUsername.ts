import { apiRoutes } from '@/src/routes'
import {
  SchemaUpdateUsernameDto,
  SchemaUserPreviewResponseDto,
} from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useUpdate } from '@/src/utils/api/mutations'

const useUpdateUsername = () => {
  const queryKeyStore = useQueryKeyStore()
  return useUpdate<SchemaUserPreviewResponseDto, SchemaUpdateUsernameDto>({
    path: apiRoutes.users,
    qKey: queryKeyStore.users.currentUserPreview.queryKey,
    updater: (oldData, newData) => ({
      ...oldData,
      ...newData,
    }),
  })
}

export default useUpdateUsername
