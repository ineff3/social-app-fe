import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import useGetPosts from '../hooks/useGetPosts'
import { PostsFlow } from './PostsFlow'
import { Helmet } from 'react-helmet-async'

export const BookmarksPage = () => {
  const queryKeyStore = useQueryKeyStore()
  return (
    <>
      <Helmet>
        <title>Bookmarks | Linker</title>
        <meta
          name="description"
          content="Save and revisit your favorite posts on Linker."
        />
        <meta property="og:title" content="Bookmarks | Linker" />
        <meta
          property="og:description"
          content="Easily access your saved posts anytime."
        />
      </Helmet>

      <PostsFlow
        flowQueryKey={
          queryKeyStore.posts.all({ filters: { bookmarked: true } }).queryKey
        }
        useGetPostsHook={useGetPosts}
        params={{ filters: { bookmarked: true } }}
        scrollPositionKey="bookmarksContext"
      />
    </>
  )
}
