import { InfiniteData } from '@tanstack/react-query'

export const isEmptyPaginatedResult = <TData extends { data: unknown[] }>(
  data: InfiniteData<TData>,
): boolean => {
  return data.pages[0].data.length === 0
}
