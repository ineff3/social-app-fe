import {
  SchemaGetSuggestionsQueryDto,
  SchemaUserSuggestionsResponseDto,
} from '@/src/types/schema'
import { getNextPageParam } from '@/src/utils/api/helpers'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetSuggestions = (query: SchemaGetSuggestionsQueryDto) => {
  const queryKeyStore = useQueryKeyStore()
  return useInfiniteQuery<SchemaUserSuggestionsResponseDto>({
    ...queryKeyStore.users.suggestions(query),
    initialPageParam: 1,
    getNextPageParam,
  })
}
