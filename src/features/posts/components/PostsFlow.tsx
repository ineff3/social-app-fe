import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Post from './Post'
import { SchemaGetAllPostsResponseDto } from '@/src/types/schema'
import {
  GetAllPostsParams,
  GetUserPostsParams,
} from '@/src/utils/api/interfaces'

export const PostsFlow = <
  TParams extends GetAllPostsParams | GetUserPostsParams,
  TResult extends UseInfiniteQueryResult<
    InfiniteData<SchemaGetAllPostsResponseDto, unknown>,
    Error
  >,
>({
  useGetPostsHook,
  params,
}: {
  useGetPostsHook: (options: TParams) => TResult
  params: TParams
}) => {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage } = useGetPostsHook(params)

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
