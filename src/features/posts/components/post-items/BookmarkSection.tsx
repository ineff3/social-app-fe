import BookmarkIconSvg from '@/src/components/ui/icons/BookmarkIconSvg'
import useBookmarkPost from '../../hooks/post-interactions/useBookmarkPost'

interface Props {
  postId: string
  isBookmarked: boolean
}

const BookmarkSection = ({ postId, isBookmarked }: Props) => {
  const useBookmarkPostMutation = useBookmarkPost(postId)

  const onClick = () => {
    useBookmarkPostMutation.mutate()
  }
  return (
    <button className=" btn btn-circle btn-ghost btn-sm" onClick={onClick}>
      <div className={` ${isBookmarked && 'text-primary'}`}>
        <BookmarkIconSvg
          width={22}
          height={22}
          stroke={isBookmarked ? 'none' : 'currentColor'}
          fill={isBookmarked ? 'currentColor' : 'none'}
        />
      </div>
    </button>
  )
}

export default BookmarkSection
