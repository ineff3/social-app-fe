import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { useApiActions } from './useApiActions'
import { GetAllPostsParams, PaginatedQueryParams } from '../interfaces'
import {
  SchemaAuthUserResponseDto,
  SchemaConversationResponseDto,
  SchemaGetAllConversationsResponseDto,
  SchemaGetAllMessagesResponseDto,
  SchemaGetAllNotificationsResponseDto,
  SchemaGetAllPostsResponseDto,
  SchemaGetDirectConversationQueryDto,
  SchemaGetMessagesQueryDto,
  SchemaGetSuggestionsQueryDto,
  SchemaGetUserByUsernameResponseDto,
  SchemaPostResponseDto,
  SchemaUsernameReservedResponseDto,
  SchemaUserPreviewResponseDto,
  SchemaUserSearchResponseDto,
  SchemaUserSuggestionsResponseDto,
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
              get<SchemaGetAllPostsResponseDto>(apiRoutes.userPosts(userId), {
                ...query,
                page: pageParam,
                isDraft,
              }),
          }),
          notifications: {
            queryKey: null,
            queryFn: ({ pageParam }: { pageParam: number }) =>
              get<SchemaGetAllNotificationsResponseDto>(
                apiRoutes.notifications,
                {
                  page: pageParam,
                  ...query,
                },
              ),
          },
        },
      }),
      detail: (postId: string) => ({
        queryKey: [postId],
        queryFn: () =>
          get<SchemaPostResponseDto>(`${apiRoutes.posts}/${postId}`),
        contextQueries: {
          comments: (query?: PaginatedQueryParams) => ({
            queryKey: [{}],
            queryFn: ({ pageParam }: { pageParam: number }) =>
              get<SchemaGetAllPostsResponseDto>(
                apiRoutes.postComments(postId),
                {
                  ...query,
                  page: pageParam,
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
      isUsernameReserved: (username: string) => ({
        queryKey: [username],
        queryFn: () =>
          get<SchemaUsernameReservedResponseDto>(
            apiRoutes.checkUsernameIsReserved,
            { username },
          ),
      }),
      search: (query: string, limit?: number) => ({
        queryKey: [query],
        queryFn: () =>
          get<SchemaUserSearchResponseDto>(apiRoutes.search, { query, limit }),
      }),
      suggestions: (query: SchemaGetSuggestionsQueryDto) => ({
        queryKey: [{}],
        queryFn: ({ pageParam }: { pageParam: number }) =>
          get<SchemaUserSuggestionsResponseDto>(apiRoutes.suggestions, {
            ...query,
            page: pageParam,
          }),
      }),
    },

    auth: {
      refreshToken: {
        queryKey: null,
        queryFn: () => get<SchemaAuthUserResponseDto>(apiRoutes.refreshToken),
      },
    },

    chat: {
      conversations: (query: PaginatedQueryParams) => ({
        queryKey: [{}],
        queryFn: ({ pageParam }: { pageParam: number }) =>
          get<SchemaGetAllConversationsResponseDto>(apiRoutes.conversations, {
            ...query,
            page: pageParam,
          }),
      }),
      messages: (query: SchemaGetMessagesQueryDto, conversationId: string) => ({
        queryKey: [conversationId, { unread: query.unread }],
        queryFn: ({ pageParam }: { pageParam: number }) =>
          get<SchemaGetAllMessagesResponseDto>(
            apiRoutes.messages(conversationId),
            {
              ...query,
              cursor: pageParam,
            },
          ),
      }),
      direct: (query: SchemaGetDirectConversationQueryDto) => ({
        queryKey: [query],
        queryFn: () =>
          get<SchemaConversationResponseDto>(apiRoutes.direct, {
            ...query,
          }),
      }),
      onlineUsers: {
        queryKey: null,
        queryFn: () => get<string[]>(apiRoutes.onlineUsers),
      },
    },
  })

  return queries
}

export default useQueryKeyStore
