import { BackBtn } from '@/src/components/ui/BackBtn'
import { useGetPostDetail } from '../../hooks/useGetPostDetail'
import { useParams } from 'react-router-dom'
import { PostNotFound } from './PostNotFound'
import { DetailPost } from './DetailPost'
import { PostsFlow } from '../PostsFlow'
import { useGetPostComments } from '../../hooks/useGetPostComments'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { StickyHeader } from '@/src/components/ui/StickyHeader'
import { useRef } from 'react'

export const PostDetailPage = () => {
  const queryKeyStore = useQueryKeyStore()
  const { postId } = useParams()
  const scrolledElementRef = useRef<HTMLElement>(document.body)

  const { data, isLoading, isError } = useGetPostDetail(postId!)

  if (isLoading) {
    return (
      <div className=" mt-12 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (isError) {
    return <PostNotFound />
  }

  return (
    <div>
      <StickyHeader scrolledElementRef={scrolledElementRef}>
        <BackBtn />
        <span className="text-lg font-bold text-secondary">Post</span>
      </StickyHeader>
      <div>{data && <DetailPost post={data} />}</div>
      <div>
        <PostsFlow
          flowQueryKey={
            queryKeyStore.posts.detail(postId!)._ctx.comments({}).queryKey
          }
          useGetPostsHook={useGetPostComments}
          params={{ postId: postId! }}
        />
      </div>
    </div>
  )
}
