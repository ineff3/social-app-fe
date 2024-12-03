import { convertPostDate } from '../utils/dateConversions'
import PostOptions from './post-items/PostOptions'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useId } from 'react'
import { SchemaPostResponseDto } from '@/src/types/schema'
import UserIconLink from '@/src/components/ui/UserIconLink'
import { convertPostTextToHTML } from '../utils/convertPostTextToHTML'
import { useNavigate } from 'react-router-dom'
import { PostInteractions } from './post-items/PostInteractions'
import { ImageDisplay } from './post-items/ImageDisplay'

interface Props {
  post: SchemaPostResponseDto
}

const Post = ({ post }: Props) => {
  const authorId = useId()
  const userPreviewData = useAppSelector(selectUserPreview)
  const navigate = useNavigate()

  const isPostAuthor = userPreviewData?.id === post.author.id
  const createdDate = new Date(post.createdAt)

  const redirectToPostPage = (e: React.MouseEvent<HTMLInputElement>) => {
    const isInteractiveElement = (e.target as HTMLElement).closest('button, a')
    if (!isInteractiveElement) {
      navigate(`/post/${post.id}`)
    }
  }

  return (
    <article
      tabIndex={0}
      aria-labelledby={authorId}
      className="border-b border-accent p-5 transition-colors duration-100 ease-in hover:cursor-pointer hover:bg-base-300 hover:bg-opacity-50 md:p-10"
      onClick={redirectToPostPage}
    >
      <div className=" flex gap-3">
        <UserIconLink
          userImageUrl={post.author?.avatarUrl}
          username={post.author?.username}
        />

        <div className=" flex flex-1 flex-col gap-5">
          <div className=" flex flex-col gap-2">
            <div className=" flex justify-between ">
              <div className="flex items-center gap-2 text-sm">
                <span className=" font-medium text-secondary" id={authorId}>
                  {post.author?.firstName} {post.author?.secondName}
                </span>
                <span className=" hidden sm:block">
                  @{post.author?.username}
                </span>
                <span>·</span>
                <time dateTime={createdDate.toISOString()}>
                  {convertPostDate(createdDate)}
                </time>
              </div>
              <PostOptions isPostAuthor={isPostAuthor} postId={post?.id} />
            </div>

            {post.text && (
              <p
                className=" text-secondary"
                dangerouslySetInnerHTML={{
                  __html: convertPostTextToHTML(post.text),
                }}
              />
            )}

            {post?.imageUrls && post?.imageUrls.length > 0 && (
              <ImageDisplay imageUrls={post.imageUrls} />
            )}
          </div>
          <PostInteractions post={post} />
        </div>
      </div>
    </article>
  )
}

export default Post
