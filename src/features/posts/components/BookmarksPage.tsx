import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import useGetPosts from '../hooks/useGetPosts'
import { PostsFlow } from './PostsFlow'

export const BookmarksPage = () => {
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
