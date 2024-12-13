import {
  SchemaGetSuggestionsQueryDto,
  SchemaUserSuggestionsResponseDto,
} from '@/src/types/schema'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { getNextPageParam } from '@/src/utils/getNextPageParam'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetSuggestions = (query: SchemaGetSuggestionsQueryDto) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaUserSuggestionsResponseDto>({
    ...queryKeyStore.users.suggestions(query),
    initialPageParam: 1,
    getNextPageParam,
  })
}
