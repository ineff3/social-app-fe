/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AppController_getHello"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_refreshToken"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_logout"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_getUserPreview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/suggestions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_getUserSuggestions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/username-reserved": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_checkUsernameReserved"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_searchUsers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/{username}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_getUserByName"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/{id}/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_findUserPosts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["UserController_updateUser"];
        trace?: never;
    };
    "/user/username": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["UserController_updateUsername"];
        trace?: never;
    };
    "/user/{id}/follow": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UserController_followUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/{id}/unfollow": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UserController_unfollowUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostController_findAll"];
        put?: never;
        post: operations["PostController_create"];
        delete: operations["PostController_bulkRemove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{id}/like": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["PostController_likePost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{id}/bookmark": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["PostController_bookmarkPost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{id}/share": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["PostController_sharePost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostController_findPostById"];
        put?: never;
        post?: never;
        delete: operations["PostController_remove"];
        options?: never;
        head?: never;
        patch: operations["PostController_updatePost"];
        trace?: never;
    };
    "/posts/{id}/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostController_findPostComments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["NotificationController_findAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/{id}/view": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["NotificationController_viewNotification"];
        trace?: never;
    };
    "/conversations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ChatController_findAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/conversations/{id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ChatController_findMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        PaginatedQueryDto: {
            /** @default 1 */
            page?: number;
            /** @default 10 */
            limit?: number;
            /**
             * @default desc
             * @enum {string}
             */
            order?: "desc" | "asc";
        };
        CursorQueryDto: {
            cursor?: string;
            /** @default 10 */
            limit?: number;
        };
        RegisterUserDto: {
            /** @example Ryan */
            firstName: string;
            /** @example Gosling */
            secondName: string;
            /** @example user@example.com */
            email: string;
            /** @example Pa$w0rd2023 */
            password: string;
            /** @example Pa$w0rd2023 */
            confirmPassword: string;
        };
        AuthUserResponseDto: {
            accessToken: string;
        };
        LoginUserDto: {
            /** @example user@example.com */
            email: string;
            /** @example Pa$w0rd2023 */
            password: string;
        };
        GetSuggestionsQueryDto: {
            /** @default 1 */
            page?: number;
            /** @default 10 */
            limit?: number;
        };
        UserPreviewResponseDto: {
            id: string;
            firstName: string;
            secondName: string;
            username: string;
            avatarUrl?: string;
            isFollowing: boolean;
        };
        UserSuggestionsResponseDto: {
            data: components["schemas"]["UserPreviewResponseDto"][];
            total: number;
            page: number;
            limit: number;
        };
        UsernameReservedResponseDto: {
            isReserved: boolean;
        };
        UserSearchResponseDto: {
            data: components["schemas"]["UserPreviewResponseDto"][];
            limit: number;
        };
        UserResponseDto: {
            id: string;
            email: string;
            username: string;
            firstName: string;
            secondName: string;
            bio: string | null;
            location: string | null;
            link: string | null;
            bornDate: string | null;
            avatarUrl?: string;
            backgroundUrl?: string;
            /** Format: date-time */
            createdAt: string;
            amountOfPosts: number;
            followersCount?: number;
            followingCount?: number;
        };
        GetUserByUsernameResponseDto: {
            isCurrentUser: boolean;
            isFollowing: boolean;
            user: components["schemas"]["UserResponseDto"];
        };
        PostResponseDto: {
            id: string;
            text: string;
            isDraft: boolean;
            likes: number;
            comments: number;
            reposts: number;
            isLiked: boolean;
            isBookmarked: boolean;
            isReposted: boolean;
            author: components["schemas"]["UserPreviewResponseDto"];
            imageUrls?: string[];
            /** Format: date-time */
            createdAt: string;
            reposted: components["schemas"]["PostResponseDto"];
        };
        GetAllPostsResponseDto: {
            data: components["schemas"]["PostResponseDto"][];
            total: number;
            page: number;
            limit: number;
        };
        UpdateUserDto: {
            /** @example Ryan */
            firstName?: string;
            /** @example Gosling */
            secondName?: string;
            bio?: string;
            location?: string;
            link?: string;
            profileImage?: string;
            backgroundImage?: string;
            bornDate?: string;
        };
        UpdateUsernameDto: {
            username: string;
        };
        GetPostsQueryDto: {
            /** @default 1 */
            page?: number;
            /** @default 10 */
            limit?: number;
            /**
             * @default desc
             * @enum {string}
             */
            order?: "desc" | "asc";
            liked?: boolean;
            bookmarked?: boolean;
            isFollowing?: boolean;
        };
        CreatePostDto: {
            text?: string;
            /** @default false */
            isDraft?: boolean;
            images?: string[];
            parentPostId?: string;
            repostedId?: string;
        };
        UpdatePostDto: {
            text?: string;
            images?: string[];
            parentPostId?: string;
            repostedId?: string;
        };
        NotificationResponseDto: {
            id: string;
            message: string | null;
            mentionedPost: components["schemas"]["PostResponseDto"] | null;
            isViewed: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        GetAllNotificationsResponseDto: {
            data: components["schemas"]["NotificationResponseDto"][];
            total: number;
            page: number;
            limit: number;
        };
        CreateMessageDto: {
            conversationId: string;
            text: string;
        };
        ParticipantResponseDto: {
            id: string;
            user: components["schemas"]["UserPreviewResponseDto"];
        };
        ConversationResponseDto: {
            id: string;
            participants: components["schemas"]["ParticipantResponseDto"][];
        };
        GetAllConversationsResponseDto: {
            data: components["schemas"]["ConversationResponseDto"][];
            total: number;
            page: number;
            limit: number;
        };
        MessageResponseDto: {
            /** @enum {string} */
            status: "sent" | "read";
            id: string;
            conversationId: string;
            text: string;
            senderId: string;
            /** Format: date-time */
            createdAt: string;
        };
        GetAllMessagesResponseDto: {
            data: components["schemas"]["MessageResponseDto"][];
            nextCursor: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type SchemaPaginatedQueryDto = components['schemas']['PaginatedQueryDto'];
export type SchemaCursorQueryDto = components['schemas']['CursorQueryDto'];
export type SchemaRegisterUserDto = components['schemas']['RegisterUserDto'];
export type SchemaAuthUserResponseDto = components['schemas']['AuthUserResponseDto'];
export type SchemaLoginUserDto = components['schemas']['LoginUserDto'];
export type SchemaGetSuggestionsQueryDto = components['schemas']['GetSuggestionsQueryDto'];
export type SchemaUserPreviewResponseDto = components['schemas']['UserPreviewResponseDto'];
export type SchemaUserSuggestionsResponseDto = components['schemas']['UserSuggestionsResponseDto'];
export type SchemaUsernameReservedResponseDto = components['schemas']['UsernameReservedResponseDto'];
export type SchemaUserSearchResponseDto = components['schemas']['UserSearchResponseDto'];
export type SchemaUserResponseDto = components['schemas']['UserResponseDto'];
export type SchemaGetUserByUsernameResponseDto = components['schemas']['GetUserByUsernameResponseDto'];
export type SchemaPostResponseDto = components['schemas']['PostResponseDto'];
export type SchemaGetAllPostsResponseDto = components['schemas']['GetAllPostsResponseDto'];
export type SchemaUpdateUserDto = components['schemas']['UpdateUserDto'];
export type SchemaUpdateUsernameDto = components['schemas']['UpdateUsernameDto'];
export type SchemaGetPostsQueryDto = components['schemas']['GetPostsQueryDto'];
export type SchemaCreatePostDto = components['schemas']['CreatePostDto'];
export type SchemaUpdatePostDto = components['schemas']['UpdatePostDto'];
export type SchemaNotificationResponseDto = components['schemas']['NotificationResponseDto'];
export type SchemaGetAllNotificationsResponseDto = components['schemas']['GetAllNotificationsResponseDto'];
export type SchemaCreateMessageDto = components['schemas']['CreateMessageDto'];
export type SchemaParticipantResponseDto = components['schemas']['ParticipantResponseDto'];
export type SchemaConversationResponseDto = components['schemas']['ConversationResponseDto'];
export type SchemaGetAllConversationsResponseDto = components['schemas']['GetAllConversationsResponseDto'];
export type SchemaMessageResponseDto = components['schemas']['MessageResponseDto'];
export type SchemaGetAllMessagesResponseDto = components['schemas']['GetAllMessagesResponseDto'];
export type $defs = Record<string, never>;
export interface operations {
    AppController_getHello: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    AuthController_register: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RegisterUserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthUserResponseDto"];
                };
            };
        };
    };
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginUserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthUserResponseDto"];
                };
            };
        };
    };
    AuthController_refreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthUserResponseDto"];
                };
            };
        };
    };
    AuthController_logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UserController_getUserPreview: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPreviewResponseDto"];
                };
            };
        };
    };
    UserController_getUserSuggestions: {
        parameters: {
            query?: {
                page?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserSuggestionsResponseDto"];
                };
            };
        };
    };
    UserController_checkUsernameReserved: {
        parameters: {
            query: {
                username: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UsernameReservedResponseDto"];
                };
            };
        };
    };
    UserController_searchUsers: {
        parameters: {
            query?: {
                query?: string;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserSearchResponseDto"];
                };
            };
        };
    };
    UserController_getUserByName: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetUserByUsernameResponseDto"];
                };
            };
        };
    };
    UserController_findUserPosts: {
        parameters: {
            query?: {
                page?: number;
                limit?: number;
                order?: "desc" | "asc";
                isDraft?: boolean;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAllPostsResponseDto"];
                };
            };
        };
    };
    UserController_updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UserController_updateUsername: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUsernameDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UserController_followUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UserController_unfollowUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_findAll: {
        parameters: {
            query?: {
                page?: number;
                limit?: number;
                order?: "desc" | "asc";
                liked?: boolean;
                bookmarked?: boolean;
                isFollowing?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAllPostsResponseDto"];
                };
            };
        };
    };
    PostController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["CreatePostDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_bulkRemove: {
        parameters: {
            query: {
                ids: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_likePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_bookmarkPost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_sharePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_findPostById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostResponseDto"];
                };
            };
        };
    };
    PostController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_updatePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["UpdatePostDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostController_findPostComments: {
        parameters: {
            query?: {
                page?: number;
                limit?: number;
                order?: "desc" | "asc";
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAllPostsResponseDto"];
                };
            };
        };
    };
    NotificationController_findAll: {
        parameters: {
            query?: {
                page?: number;
                limit?: number;
                order?: "desc" | "asc";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAllNotificationsResponseDto"];
                };
            };
        };
    };
    NotificationController_viewNotification: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ChatController_findAll: {
        parameters: {
            query?: {
                page?: number;
                limit?: number;
                order?: "desc" | "asc";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAllConversationsResponseDto"];
                };
            };
        };
    };
    ChatController_findMessages: {
        parameters: {
            query?: {
                cursor?: string;
                limit?: number;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAllMessagesResponseDto"];
                };
            };
        };
    };
}
