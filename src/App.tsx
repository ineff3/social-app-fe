import { Route, Routes, useLocation } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import {
  FlowController,
  RouteAuth,
  UserInit,
} from './features/authentication/index'
import {
  Auth,
  Bookmarks,
  CreatePost,
  Home,
  ManageDrafts,
  Messages,
  Notifications,
  PostPage,
  Premium,
  Profile,
  Search,
  SignupPage,
} from './pages'
import { pageRoutes } from './routes'
import { DraftProvider, PostProvider } from './features/posts'
import { PostCreationLayout } from './layouts/PostCreationLayout'

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
          <Route path={pageRoutes.auth} element={<Auth />}>
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Route>
        <Route element={<RouteAuth required />}>
          <Route element={<UserInit />}>
            <Route element={<BaseLayout />}>
              <Route
                path={pageRoutes.signupFlow}
                element={<FlowController />}
              />
              <Route path={pageRoutes.home} element={<Home />} />
              <Route path={pageRoutes.profile} element={<Profile />} />
              <Route path={pageRoutes.post} element={<PostPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route element={<RouteAuth required />}>
            <Route element={<UserInit />}>
              <Route
                element={
                  <PostProvider>
                    <PostCreationLayout />
                  </PostProvider>
                }
              >
                <Route path={pageRoutes.createPost} element={<CreatePost />} />
                <Route
                  path={pageRoutes.drafts}
                  element={
                    <DraftProvider>
                      <ManageDrafts />
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
