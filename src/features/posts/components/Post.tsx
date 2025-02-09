import { convertPostDate } from '../utils/dateConversions'
import PostOptions from './post-items/PostOptions'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useId } from 'react'
import { SchemaPostResponseDto } from '@/src/generated/schema'
import UserIconLink from '@/src/components/ui/UserIconLink'
import { convertPostTextToHTML } from '../utils/convertPostTextToHTML'
import { useNavigate } from 'react-router-dom'
import { PostInteractions } from './post-items/PostInteractions'
import { ImageDisplay } from './post-items/ImageDisplay'
import { RepostBadge } from './post-items/RepostBadge'
import { Repost } from './post-creation/additional-content/Repost'
import { QueryKey } from '@tanstack/react-query'

interface Props {
  post: SchemaPostResponseDto
  qKey: QueryKey
}

const Post = ({ post, qKey }: Props) => {
  const isQuoted = (post.text || post.postImages.length > 0) && post.reposted
  const actualPost = isQuoted ? post : post.reposted ? post.reposted : post
  const { id, author, createdAt, text, postImages } = actualPost
  const authorId = useId()
  const userPreviewData = useAppSelector(selectUserPreview)
  const isPostAuthor = userPreviewData?.id === author.id

  const navigate = useNavigate()

  const redirectToPostPage = (e: React.MouseEvent<HTMLInputElement>) => {
    const isInteractiveElement = (e.target as HTMLElement).closest(
      'button, a, [data-interactive="true"]',
    )
    if (!isInteractiveElement) {
      navigate(`/post/${id}`)
    }
  }
  const createdDate = new Date(createdAt!)

  return (
    <article
      tabIndex={0}
      aria-labelledby={authorId}
      className="border-b border-accent p-5 transition-colors duration-100 ease-in hover:cursor-pointer hover:bg-base-300 hover:bg-opacity-50 md:py-7"
      onClick={redirectToPostPage}
    >
      <div className="relative flex gap-3">
        {!isQuoted && post.reposted && (
          <div className="absolute -top-[20px] left-[35px]">
            <RepostBadge repostAuthor={post.author} />
          </div>
        )}
        <UserIconLink
          userImageUrl={author?.profileUrl}
          username={author?.username}
        />

        <div className=" flex flex-1 flex-col gap-5">
          <div className=" flex flex-col gap-2">
            <div className=" flex justify-between ">
              <div className="flex items-center gap-2 text-sm">
                <span className=" font-medium text-secondary" id={authorId}>
                  {author?.firstName} {author?.secondName}
                </span>
                <span className=" hidden sm:block">@{author?.username}</span>
                <span>·</span>
                <time dateTime={createdDate.toISOString()}>
                  {convertPostDate(createdDate)}
                </time>
              </div>
              <PostOptions isPostAuthor={isPostAuthor} postId={id} />
            </div>

            {text && (
              <p
                className=" text-secondary"
                dangerouslySetInnerHTML={{
                  __html: convertPostTextToHTML(text),
                }}
              />
            )}

            <ImageDisplay postImages={postImages} />

            {isQuoted && (
              <Repost post={actualPost.reposted} isInteractive={true} />
            )}
          </div>
          <PostInteractions
            qKey={qKey}
            post={actualPost}
            initialPostId={post.id}
          />
        </div>
      </div>
    </article>
  )
}

export default Post
