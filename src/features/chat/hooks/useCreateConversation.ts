import { apiRoutes } from '@/src/routes'
import {
  SchemaConversationResponseDto,
  SchemaCreateConversationDto,
} from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { usePost } from '@/src/utils/api/mutations'

export const useCreateConversation = () => {
  const queryKeyStore = useQueryKeyStore()
  return usePost<
    SchemaConversationResponseDto,
    SchemaCreateConversationDto,
    SchemaConversationResponseDto
  >({
    path: apiRoutes.conversations,
    qKey: queryKeyStore.chat.conversations({}).queryKey,
  })
}
