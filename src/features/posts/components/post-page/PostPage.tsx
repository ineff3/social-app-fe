import { BackBtn } from '@/src/components/ui/BackBtn'
import { useIsScrolled } from '@/src/hooks/useIsScrolled'
import { useGetPostDetail } from '../../hooks/useGetPostDetail'
import { useParams } from 'react-router-dom'
import { PostNotFound } from './PostNotFound'
import Post from '../Post'

export const PostPage = () => {
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
        className={` sticky top-0 flex items-center justify-between border-b border-accent bg-base-100 px-10 py-1.5 ${isScrolled && ' bg-opacity-60 backdrop-blur-sm'}`}
      >
        <div className=" flex items-center gap-4">
          <BackBtn />
          <span className="text-lg font-bold text-secondary">Post</span>
        </div>
        <button className="btn btn-outline btn-secondary btn-sm ">Reply</button>
      </header>
      <div>{data && <Post post={data} />}</div>
    </div>
  )
}
