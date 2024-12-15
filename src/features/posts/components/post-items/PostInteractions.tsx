import CommentIconSvg from '@/src/components/ui/icons/CommentIconSvg'
import LikeSection from './LikeSection'
import BookmarkSection from './BookmarkSection'
import { SchemaPostResponseDto } from '@/src/types/schema'
import { RepostSection } from './repost/RepostSection'
import { QueryKey } from '@tanstack/react-query'
import { QueryUpdater } from '@/src/utils/api/interfaces'

interface Props {
  post: SchemaPostResponseDto
  initialPostId: string
  qKey: QueryKey
  likeUpdater?: QueryUpdater
  bookmarkUpdater?: QueryUpdater
}

export const PostInteractions = ({
  post,
  initialPostId,
  qKey,
  likeUpdater,
  bookmarkUpdater,
}: Props) => {
  return (
    <div role="group" className=" flex justify-between">
      <div className=" flex items-center gap-1.5">
        <CommentIconSvg width={22} height={22} fill="currentColor" />
        <p>{post.comments}</p>
      </div>
      <div className=" flex items-center gap-1.5">
        <RepostSection postId={initialPostId} actualPost={post} />
      </div>
      <div className=" flex items-center gap-1.5">
        <LikeSection
          qKey={qKey}
          postId={post.id}
          likesCount={post.likes}
          isLiked={post.isLiked}
          updater={likeUpdater}
        />
      </div>
      <div className=" flex items-center gap-1.5">
        <BookmarkSection
          qKey={qKey}
          postId={post.id}
          isBookmarked={post.isBookmarked}
          updater={bookmarkUpdater}
        />
      </div>
    </div>
  )
}
