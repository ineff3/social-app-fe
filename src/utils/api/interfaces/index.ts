export interface PaginatedQueryParams {
  limit?: number
  order?: 'asc' | 'desc'
}

export interface PostFilters {
  liked?: boolean
  bookmarked?: boolean
}

export interface GetAllPostsParams {
  query?: PaginatedQueryParams
  filters?: PostFilters
}

export interface GetUserPostsParams {
  query?: PaginatedQueryParams
  userId: string
  isDraft?: boolean
}
