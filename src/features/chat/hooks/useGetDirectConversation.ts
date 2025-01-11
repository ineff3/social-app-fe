import { SchemaGetDirectConversationQueryDto } from '@/src/generated/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useQuery } from '@tanstack/react-query'

export const useGetDirectConversation = (
  query: SchemaGetDirectConversationQueryDto,
  enabled: boolean,
) => {
  const queryKeyStore = useQueryKeyStore()
  return useQuery({
    ...queryKeyStore.chat.direct(query),
    enabled,
  })
}
