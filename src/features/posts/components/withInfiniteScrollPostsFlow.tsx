/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { SchemaGetAllPostsResponseDto } from '../../../types/schema'
import { useEffect } from 'react'
import Post from './Post'

export const withInfiniteScrollPostsFlow = (
  useGetPostsHook: ({
    limit,
  }: {
    limit: number
  }) => UseInfiniteQueryResult<
    InfiniteData<SchemaGetAllPostsResponseDto, unknown>,
    Error
  >,
) =>
  function PostsFlow() {
    const { ref, inView } = useInView()
    const { data, fetchNextPage, hasNextPage } = useGetPostsHook({ limit: 5 })

    useEffect(() => {
      if (inView) {
        fetchNextPage()
      }
    }, [inView, fetchNextPage])

    return (
      <div className=" flex flex-col">
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
