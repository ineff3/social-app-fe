import { PostsFlow } from '../features/posts/components/PostsFlow'
import useGetPosts from '../features/posts/hooks/useGetPosts'
import useQueryKeyStore from '../utils/api/hooks/useQueryKeyStore'

const Bookmarks = () => {
  const queryKeyStore = useQueryKeyStore()
  return (
    <PostsFlow
      flowQueryKey={
        queryKeyStore.posts.all({ filters: { bookmarked: true } }).queryKey
      }
      useGetPostsHook={useGetPosts}
      params={{ filters: { bookmarked: true } }}
      scrollPositionKey="bookmarksContext"
    />
  )
}

export default Bookmarks
