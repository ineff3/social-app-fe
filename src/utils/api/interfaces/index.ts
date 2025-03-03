import { SchemaCursorQueryDto } from '@/src/generated/schema'

export interface PaginatedQueryParams {
  limit?: number
  order?: 'asc' | 'desc'
}

export interface PostFilters {
  liked?: boolean
  bookmarked?: boolean
  isFollowing?: boolean
}

export interface GetAllPostsParams {
  query?: SchemaCursorQueryDto
  filters?: PostFilters
}

export interface GetUserPostsParams {
  query?: PaginatedQueryParams
  userId: string
  isDraft?: boolean
}

export interface GetPostCommentsParams {
  query?: PaginatedQueryParams
  postId: string
}

export interface PaginatedResponseDto<TData> {
  data: TData[]
  total: number
  page: number
  limit: number
}

export type QueryUpdater = <T>(oldData: T) => T
