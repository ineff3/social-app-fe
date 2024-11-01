import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { useApiActions } from './useApiActions'
import { GetAllPostsParams, IUsernamesResponse } from '../interfaces'
import {
  SchemaAuthUserResponseDto,
  SchemaGetAllPostsResponseDto,
  SchemaGetUserByUsernameResponseDto,
  SchemaUserPreviewResponseDto,
} from '@/src/types/schema'
import { apiRoutes } from '@/src/routes'

const useQueryKeyStore = () => {
  const { get } = useApiActions()
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
    auth: {
      refreshToken: {
        queryKey: null,
        queryFn: () => get<SchemaAuthUserResponseDto>(apiRoutes.refreshToken),
      },
    },
  })

  return queries
}

export default useQueryKeyStore