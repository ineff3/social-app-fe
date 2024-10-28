import { IUser } from '../../../features/authentication/interfaces'
import { IPost } from '../../../features/posts/interfaces'

export interface IUserDetailResponse {
  isCurrentUser: boolean
  userData: IUser
}
export interface IUsernamesResponse {
  usernames: string[]
}
export interface IPostsResponse {
  data: IPost[]
  nextPage: number | null
  totalPages: number
}

// -------
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
}
