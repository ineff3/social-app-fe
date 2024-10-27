import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { useApi } from './actions'
import { apiRoutes } from '../../routes'
import { IUsernamesResponse } from './interfaces'
import { IDraft } from '../../features/posts/interfaces'
import {
  SchemaGetAllPostsResponseDto,
  SchemaGetPostsQueryDto,
  SchemaGetUserByUsernameResponseDto,
  SchemaUserPreviewResponseDto,
} from '../../types/schema'

const useQueryKeyStore = () => {
  const { get } = useApi()
  const queries = createQueryKeyStore({
    posts: {
      all: (query: SchemaGetPostsQueryDto) => ({
        queryKey: [query],
        queryFn: ({ pageParam }: { pageParam: number }) =>
          get<SchemaGetAllPostsResponseDto>(apiRoutes.posts, {
            ...query,
            page: pageParam,
          }),
        contextQueries: {
          user: (userId: string) => ({
            queryKey: [userId],
            queryFn: ({ pageParam }: { pageParam: number }) =>
              get<SchemaGetAllPostsResponseDto>(
                `${apiRoutes.posts}/${userId}`,
                {
                  page: pageParam,
                  ...query,
                },
              ),
          }),
        },
      }),
      drafts: {
        queryKey: null,
        queryFn: () => get<IDraft[]>(apiRoutes.drafts),
      },
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
