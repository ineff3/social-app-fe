import UserIconLink from '@/src/components/ui/UserIconLink'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { SchemaPostResponseDto } from '@/src/types/schema'
import { useId } from 'react'
import { convertPostTextToHTML } from '../../utils/convertPostTextToHTML'
import PostOptions from '../post-items/PostOptions'
import { ImageDisplay } from '../post-items/ImageDisplay'
import { PostInteractions } from '../post-items/PostInteractions'
import { convertToFullFate } from '../../utils/dateConversions'
import { ReplySection } from './ReplySection'
import { PostProvider } from '../../contexts/PostContext'
import { Repost } from '../post-creation/additional-content/Repost'

interface Props {
  post: SchemaPostResponseDto
}

export const DetailPost = ({ post }: Props) => {
  const isQuoted = (post.text || post.imageUrls) && post.reposted
  const authorId = useId()
  const userPreviewData = useAppSelector(selectUserPreview)

  const isPostAuthor = userPreviewData?.id === post.author.id
  const createdDate = new Date(post.createdAt)
  const [time, date] = convertToFullFate(createdDate)

  return (
    <article
      tabIndex={0}
      aria-labelledby={authorId}
      className="flex flex-col gap-6 border-b border-accent p-3 transition-colors duration-100 ease-in md:p-6 "
    >
      <div className=" flex justify-between">
        <div className=" flex gap-2">
          <UserIconLink
            userImageUrl={post.author?.avatarUrl}
            username={post.author?.username}
          />
          <div className=" flex flex-col">
            <p className=" text-secondary">{post.author.firstName}</p>
            <p className=" text-sm ">@{post.author.username}</p>
          </div>
        </div>
        <PostOptions isPostAuthor={isPostAuthor} postId={post?.id} />
      </div>

      <div className=" flex flex-col gap-2">
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

        {isQuoted && <Repost post={post.reposted} isInteractive={true} />}
      </div>
      <time className="flex gap-2" dateTime={createdDate.toISOString()}>
        <span>{time}</span>
        <span>·</span>
        <span>{date}</span>
      </time>
      <div className="flex flex-col gap-1.5">
        <div className=" w-full border-b border-accent" />
        <div className="px-10">
          <PostInteractions post={post} initialPostId={post.id} />
        </div>
        <div className=" w-full border-b border-accent" />
      </div>
      <div>
        <PostProvider>
          <ReplySection parentPostId={post.id} />
        </PostProvider>
      </div>
    </article>
  )
}
