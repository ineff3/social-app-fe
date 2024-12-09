import { PostsFlow } from '../features/posts/components/PostsFlow'
import useGetPosts from '../features/posts/hooks/useGetPosts'

const Bookmarks = () => {
  return (
    <PostsFlow
      useGetPostsHook={useGetPosts}
      params={{ filters: { bookmarked: true } }}
      scrollPositionKey="bookmarksContext"
    />
  )
}

export default Bookmarks
