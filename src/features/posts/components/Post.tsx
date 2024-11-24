import { convertPostDate } from '../utils/dateConvertions'
import LikeSection from './post-items/LikeSection'
import BookmarkSection from './post-items/BookmarkSection'
import PostOptions from './post-items/PostOptions'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useId } from 'react'
import CommentIconSvg from '@/src/components/ui/icons/CommentIconSvg'
import { SchemaPostResponseDto } from '@/src/types/schema'
import UserIconLink from '@/src/components/ui/UserIconLink'
import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'
import { convertPostTextToHTML } from '../utils/convertPostTextToHTML'

interface Props {
  post: SchemaPostResponseDto
}

const Post = ({ post }: Props) => {
  const authorId = useId()
  const userPreviewData = useAppSelector(selectUserPreview)
  const isPostAuthor = userPreviewData?.id === post.author.id
  const createdDate = new Date(post.createdAt)

  return (
    <article
      tabIndex={0}
      aria-labelledby={authorId}
      className=" border-b border-accent p-5 md:p-10"
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
              <div
                className={` grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]  overflow-hidden rounded-lg ${post.imageUrls.length > 2 ? 'max-h-[550px] grid-rows-2 ' : 'max-h-[500px] grid-rows-1'}  `}
              >
                {post.imageUrls?.map((path, index) => (
                  <div
                    key={index}
                    className={` ${post.imageUrls?.length === 3 && index === 0 && 'col-span-2'}`}
                  >
                    <img
                      src={path}
                      alt="Post Image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div role="group" className=" flex justify-between">
            <div className=" flex items-center gap-1.5">
              <CommentIconSvg width={22} height={22} fill="currentColor" />
              <p>3</p>
            </div>
            <div className=" flex items-center gap-1.5">
              <RepostIconSvg width={22} height={22} fill="currentColor" />
              <p>12</p>
            </div>
            <div className=" flex items-center gap-1.5">
              <LikeSection
                postId={post.id}
                likesCount={post.likes}
                isLiked={post.isLiked}
              />
            </div>
            <div className=" flex items-center gap-1.5">
              <BookmarkSection
                postId={post.id}
                isBookmarked={post.isBookmarked}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post
