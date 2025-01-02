import { InfiniteData } from '@tanstack/react-query'

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
  TRecord extends { id: string },
  TRes extends { data: TRecord[] } = { data: TRecord[] },
  TData extends InfiniteData<TRes> = InfiniteData<TRes>,
>(
  id: string,
  updater: (record: TRecord) => TRecord,
): ((data: TData) => TData) => {
  return (oldData: TData) => {
    if (!oldData) return oldData
    oldData
    const updatedPages = oldData.pages.map((page) => ({
      ...page,
      data: page.data.map((record) =>
        id === record.id ? { ...record, ...updater(record) } : record,
      ),
    }))

    return {
      ...oldData,
      pages: updatedPages,
    }
  }
}
