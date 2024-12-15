import { InfiniteData } from '@tanstack/react-query'
import { PaginatedResponseDto } from './interfaces'

export const getNextPageParam = ({
  page,
  limit,
  total,
}: {
  page: number
  limit: number
  total: number
}) => {
  const totalPages = Math.ceil(total / limit)
  return page < totalPages ? page + 1 : null
}

export const handleUpdater = <
  TEntry extends { id: string },
  TRes extends PaginatedResponseDto<TEntry>,
  TData extends InfiniteData<TRes>,
>(
  id: string,
  update: Record<string, unknown>,
): ((data: TData) => TData) => {
  return (oldData: TData) => {
    if (!oldData) return oldData

    const updatedPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.map((entry) =>
        id === entry.id ? { ...entry, ...update } : entry,
      ),
    }))

    return {
      ...oldData,
      pages: updatedPages,
    }
  }
}
