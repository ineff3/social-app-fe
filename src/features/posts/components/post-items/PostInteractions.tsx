import CommentIconSvg from '@/src/components/ui/icons/CommentIconSvg'
import LikeSection from './LikeSection'
import BookmarkSection from './BookmarkSection'
import { SchemaPostResponseDto } from '@/src/types/schema'
import { RepostSection } from './repost/RepostSection'

interface Props {
  post: SchemaPostResponseDto
  initialPostId: string
}

export const PostInteractions = ({ post, initialPostId }: Props) => {
  return (
    <div role="group" className=" flex justify-between">
      <div className=" flex items-center gap-1.5">
        <CommentIconSvg width={22} height={22} fill="currentColor" />
        <p>{post.comments}</p>
      </div>
      <div className=" flex items-center gap-1.5">
        <RepostSection
          repostsCount={12}
          postId={initialPostId}
          isReposted={post.isReposted}
        />
      </div>
      <div className=" flex items-center gap-1.5">
        <LikeSection
          postId={post.id}
          likesCount={post.likes}
          isLiked={post.isLiked}
        />
      </div>
      <div className=" flex items-center gap-1.5">
        <BookmarkSection postId={post.id} isBookmarked={post.isBookmarked} />
      </div>
    </div>
  )
}
