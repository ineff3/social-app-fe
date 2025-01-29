import {
  SchemaUpdateUserDto,
  SchemaUserResponseDto,
} from '@/src/generated/schema'
import { apiRoutes } from '@/src/routes'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useUpdate } from '@/src/utils/api/mutations'

export const useEditProfile = () => {
  const queryKeyStore = useQueryKeyStore()
  return useUpdate<SchemaUserResponseDto, SchemaUpdateUserDto>({
    path: apiRoutes.users,
    qKey: queryKeyStore.users._def,
  })
}
