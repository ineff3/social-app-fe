import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Post from './Post'
import {
  SchemaGetAllPostsResponseDto,
  SchemaGetPostsQueryDto,
} from '../../../types/schema'

// Interface for the options for each specific hook
type FetchAllPostsOptions = SchemaGetPostsQueryDto
type FetchUserPostsOptions = SchemaGetPostsQueryDto & { userId: string }

// Higher Order Component definition
export const withInfiniteScrollPostsFlow = <
  TOptions extends FetchAllPostsOptions | FetchUserPostsOptions,
  TResult extends UseInfiniteQueryResult<
    InfiniteData<SchemaGetAllPostsResponseDto, unknown>,
    Error
  >,
>(
  useGetPostsHook: (options: TOptions) => TResult,
) =>
  function PostsFlow(props: TOptions) {
    const { ref, inView } = useInView()
    const { data, fetchNextPage, hasNextPage } = useGetPostsHook(props)

    useEffect(() => {
      if (inView) {
        fetchNextPage()
      }
    }, [inView, fetchNextPage])

    return (
      <div className="flex flex-col">
        {data &&
          data.pages.map((page) => (
            <div key={page.page}>
              {page.data.map((post) => (
                <Post key={post.id} post={post} />
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
