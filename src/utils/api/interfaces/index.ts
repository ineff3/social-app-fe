import { IUser } from '../../../features/authentication/interfaces'

export interface IUserDetailResponse {
  isCurrentUser: boolean
  userData: IUser
}
export interface IUsernamesResponse {
  usernames: string[]
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
  isDraft?: boolean
}
