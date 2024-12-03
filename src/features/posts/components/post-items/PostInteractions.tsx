import CommentIconSvg from '@/src/components/ui/icons/CommentIconSvg'
import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'
import LikeSection from './LikeSection'
import BookmarkSection from './BookmarkSection'
import { SchemaPostResponseDto } from '@/src/types/schema'

interface Props {
  post: SchemaPostResponseDto
}

export const PostInteractions = ({ post }: Props) => {
  return (
    <div role="group" className=" flex justify-between">
      <div className=" flex items-center gap-1.5">
        <CommentIconSvg width={22} height={22} fill="currentColor" />
        <p>{post.comments}</p>
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
        <BookmarkSection postId={post.id} isBookmarked={post.isBookmarked} />
      </div>
    </div>
  )
}
