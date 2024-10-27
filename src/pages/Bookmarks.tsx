import { withInfiniteScrollPostsFlow } from '../features/posts'
import useGetBookmarkedPosts from '../features/posts/hooks/useGetBookmarkedPosts'

const BookmarkedPostsFlow = withInfiniteScrollPostsFlow(useGetBookmarkedPosts)

const Bookmarks = () => {
  return <BookmarkedPostsFlow />
}

export default Bookmarks
