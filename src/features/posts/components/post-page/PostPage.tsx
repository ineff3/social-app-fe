import { BackBtn } from '@/src/components/ui/BackBtn'
import { useIsScrolled } from '@/src/hooks/useIsScrolled'
import { useGetPostDetail } from '../../hooks/useGetPostDetail'
import { useParams } from 'react-router-dom'
import { PostNotFound } from './PostNotFound'
import { DetailPost } from './DetailPost'
import { PostsFlow } from '../PostsFlow'
import { useGetPostComments } from '../../hooks/useGetPostComments'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

export const PostPage = () => {
  const queryKeyStore = useQueryKeyStore()
  const { postId } = useParams()
  const isScrolled = useIsScrolled()

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
      <header
        className={` sticky top-0 z-10 flex items-center border-b border-accent bg-base-100 px-10 py-1.5 ${isScrolled && ' bg-opacity-60 backdrop-blur-sm'}`}
      >
        <div className=" flex items-center gap-4">
          <BackBtn />
          <span className="text-lg font-bold text-secondary">Post</span>
        </div>
      </header>
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
