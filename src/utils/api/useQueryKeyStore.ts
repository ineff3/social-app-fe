import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { useApi } from './actions'
import { apiRoutes } from '../../routes'
import { GetAllPostsParams, IUsernamesResponse } from './interfaces'
import {
  SchemaGetAllPostsResponseDto,
  SchemaGetUserByUsernameResponseDto,
  SchemaUserPreviewResponseDto,
} from '../../types/schema'

const useQueryKeyStore = () => {
  const { get } = useApi()
  const queries = createQueryKeyStore({
    posts: {
      all: ({ query, filters = {} }: GetAllPostsParams) => ({
        queryKey: [filters],
        queryFn: ({ pageParam }: { pageParam: number }) =>
          get<SchemaGetAllPostsResponseDto>(apiRoutes.posts, {
            ...query,
            ...filters,
            page: pageParam,
          }),
        contextQueries: {
          user: (userId: string, isDraft?: boolean) => ({
            queryKey: isDraft ? [userId, { isDraft }] : [userId],
            queryFn: ({ pageParam }: { pageParam: number }) =>
              get<SchemaGetAllPostsResponseDto>(
                `${apiRoutes.posts}/${userId}`,
                {
                  ...query,
                  page: pageParam,
                  isDraft,
                },
              ),
          }),
        },
      }),
    },

    users: {
      currentUserPreview: {
        queryKey: null,
        queryFn: () =>
          get<SchemaUserPreviewResponseDto>(apiRoutes.currentUserPreview),
      },
      detail: (username: string) => ({
        queryKey: [username],
        queryFn: () =>
          get<SchemaGetUserByUsernameResponseDto>(
            `${apiRoutes.users}/${username}`,
          ),
      }),
      usernames: {
        queryKey: null,
        queryFn: () => get<IUsernamesResponse>(apiRoutes.getUsernamesArray),
      },
    },
  })

  return queries
}

export default useQueryKeyStore
