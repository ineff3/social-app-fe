import { Route, Routes, useLocation } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import { pageRoutes } from './routes'
import { PostCreationLayout } from './layouts/PostCreationLayout'
import { ConversationsPage } from './features/chat/components/ConversationsPage'
import { MainPostsPage } from './features/posts/components/MainPostsPage'
import { BookmarksPage } from './features/posts/components/BookmarksPage'
import { NotificationPage } from './features/notifications/components/NotificationPage'
import { PostDetailPage } from './features/posts/components/post-page/PostDetailPage'
import { ProfilePage } from './features/users/components/ProfilePage'
import { SignupFlowPage } from './features/authentication/components/signup-flow/SignupFlowPage'
import { SignupPage } from './features/authentication/components/SignupPage'
import { LoginPage } from './features/authentication/components/LoginPage'
import { RouteAuth } from './features/authentication/components/routes-accessors/RouteAuth'
import { UserInit } from './features/authentication/components/routes-accessors/UserInit'
import { CreatePostPage } from './features/posts/components/post-creation/CreatePostPage'
import { PostProvider } from './features/posts/contexts/PostContext'
import { DraftProvider } from './features/posts/contexts/DraftContext'
import { DraftsPage } from './features/posts/components/post-creation/drafts/DraftsPage'

const App = () => {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  const backgroundLocation =
    location.pathname === pageRoutes.createPost && !state?.backgroundLocation
      ? pageRoutes.home
      : state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route element={<RouteAuth />}>
          <Route path={pageRoutes.auth} element={<LoginPage />}>
            <Route path={pageRoutes.authSignup} element={<SignupPage />} />
          </Route>
        </Route>
        <Route element={<RouteAuth required={true} />}>
          <Route element={<UserInit />}>
            <Route element={<BaseLayout />}>
              <Route
                path={pageRoutes.signupFlow}
                element={<SignupFlowPage />}
              />
              <Route path={pageRoutes.home} element={<MainPostsPage />} />
              <Route path={pageRoutes.profile} element={<ProfilePage />} />
              <Route
                path={pageRoutes.postDetail}
                element={<PostDetailPage />}
              />
              <Route path="/search" element={<></>} />
              <Route
                path={pageRoutes.notifications}
                element={<NotificationPage />}
              />
              <Route
                path={pageRoutes.conversations}
                element={<ConversationsPage />}
              />
              <Route path={pageRoutes.bookmarks} element={<BookmarksPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route element={<RouteAuth required={true} />}>
            <Route element={<UserInit />}>
              <Route
                element={
                  <PostProvider>
                    <PostCreationLayout />
                  </PostProvider>
                }
              >
                <Route
                  path={pageRoutes.createPost}
                  element={<CreatePostPage />}
                />
                <Route
                  path={pageRoutes.drafts}
                  element={
                    <DraftProvider>
                      <DraftsPage />
                    </DraftProvider>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      )}
    </>
  )
}

export default App
