import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Post from './Post'
import { SchemaGetAllPostsResponseDto } from '@/src/generated/schema'
import {
  GetAllPostsParams,
  GetPostCommentsParams,
  GetUserPostsParams,
} from '@/src/utils/api/interfaces'
import { ScrollPositionKey } from '@/src/redux/user/userSlice'
import { useRestoreScrollPosition } from '@/src/hooks/useRestoreScrollPosition'
import { PostSkeleton } from './PostSkeleton'

type PossibleParams =
  | GetAllPostsParams
  | GetUserPostsParams
  | GetPostCommentsParams

export const PostsFlow = <TParams extends PossibleParams>({
  useGetPostsHook,
  params,
  flowQueryKey,
  scrollPositionKey,
}: {
  useGetPostsHook: (
    options: TParams,
  ) => UseInfiniteQueryResult<
    InfiniteData<SchemaGetAllPostsResponseDto, unknown>,
    Error
  >
  params: TParams
  flowQueryKey: QueryKey
  scrollPositionKey?: ScrollPositionKey
}) => {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetPostsHook(params)

  useRestoreScrollPosition(scrollPositionKey)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <PostSkeleton />
        <PostSkeleton skeletonType="image" />
      </div>
    )
  }

  return (
    <div className="flex flex-col" role="feed">
      {data &&
        data.pages.map((page) => (
          <div key={page.page}>
            {page.data.map((post) => (
              <Post qKey={flowQueryKey} key={post.id} post={post} />
            ))}
          </div>
        ))}
      {hasNextPage && (
        <span
          ref={ref}
          className="loading loading-spinner loading-lg my-4 self-center"
        ></span>
      )}
    </div>
  )
}
