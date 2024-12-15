import BookmarkIconSvg from '@/src/components/ui/icons/BookmarkIconSvg'
import useBookmarkPost from '../../hooks/post-interactions/useBookmarkPost'
import { QueryKey } from '@tanstack/react-query'

interface Props {
  postId: string
  isBookmarked: boolean
  qKey: QueryKey
}

const BookmarkSection = ({ postId, isBookmarked, qKey }: Props) => {
  const useBookmarkPostMutation = useBookmarkPost(postId, qKey)

  const onClick = () => {
    useBookmarkPostMutation.mutate()
  }
  return (
    <div data-tip="Bookmark" className=" tooltip tooltip-secondary">
      <button
        aria-label="bookmark"
        className=" btn btn-circle btn-ghost btn-sm"
        onClick={onClick}
      >
        <div className={` ${isBookmarked && 'text-primary'}`}>
          <BookmarkIconSvg
            width={22}
            height={22}
            stroke={isBookmarked ? 'none' : 'currentColor'}
            fill={isBookmarked ? 'currentColor' : 'none'}
          />
        </div>
      </button>
    </div>
  )
}

export default BookmarkSection
