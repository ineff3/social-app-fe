import { withInfiniteScrollPostsFlow } from '../features/posts'
import useGetPosts from '../features/posts/hooks/useGetPosts'

const BookmarkedPostsFlow = withInfiniteScrollPostsFlow(useGetPosts)

const Bookmarks = () => {
  return <BookmarkedPostsFlow bookmarked />
}

export default Bookmarks
