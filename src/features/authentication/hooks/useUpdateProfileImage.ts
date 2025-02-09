import {
  SchemaUpdateUserDto,
  SchemaUserResponseDto,
} from '@/src/generated/schema'
import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useUpdate } from '@/src/utils/api/mutations'

export const useUpdateProfileImage = () => {
  const queryKeyStore = useQueryKeyStore()
  return useUpdate<
    SchemaUserResponseDto,
    Pick<SchemaUpdateUserDto, 'profileImageKey'>
  >({
    path: apiRoutes.users,
    qKey: queryKeyStore.users._def,
  })
}
