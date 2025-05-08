import { useGetPostDetail } from '../../hooks/useGetPostDetail'
import { useParams } from 'react-router-dom'
import { DetailPost } from './DetailPost'
import { PostsFlow } from '../PostsFlow'
import { useGetPostComments } from '../../hooks/useGetPostComments'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { StickyHeader } from '@/src/components/ui/StickyHeader'
import { useRef } from 'react'
import { BackCircleButton } from '@/src/components/ui/buttons/BackCircleButton'
import { Spinner } from '@/src/components/ui/spinners/Spinner'
import { Helmet } from 'react-helmet-async'
import { NotFoundScreen } from '@/src/components/ui/NotFoundScreen'

export const PostDetailPage = () => {
  const queryKeyStore = useQueryKeyStore()
  const { postId } = useParams()
  const scrolledElementRef = useRef<HTMLElement>(document.body)

  const { data, isLoading, isError } = useGetPostDetail(postId!)

  if (isLoading) {
    return (
      <div className=" mt-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return (
      <NotFoundScreen
        title="We couldn't find that post"
        content="Make sure the link is correct or try again later."
        className="h-screen"
        size="xl"
      />
    )
  }

  return (
    <div>
      <StickyHeader scrolledElementRef={scrolledElementRef}>
        <div className="flex items-center gap-3 px-5 py-2">
          <BackCircleButton size="sm" className="fill-secondary" />
          <span className="text-lg font-bold text-secondary">Post</span>
        </div>
      </StickyHeader>
      {data && (
        <>
          <Helmet>
            <title>
              {data.author.firstName} {data.author.secondName}
            </title>
            <meta
              name="description"
              content="Read and engage with this post on Linker."
            />
            <meta
              property="og:title"
              content={`${data.author.firstName} ${data.author.secondName}`}
            />
            <meta
              property="og:description"
              content="Join the conversation and engage with this post on Linker."
            />
            <meta property="og:type" content="article" />
          </Helmet>

          <DetailPost post={data} />
        </>
      )}
      <PostsFlow
        flowQueryKey={
          queryKeyStore.posts.detail(postId!)._ctx.comments({}).queryKey
        }
        useGetPostsHook={useGetPostComments}
        params={{ postId: postId! }}
      />
    </div>
  )
}
