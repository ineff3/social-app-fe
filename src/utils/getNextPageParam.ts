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
