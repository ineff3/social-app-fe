export const apiRoutes = {
  //user
  users: 'user',
  refreshToken: 'auth/refresh-token',
  login: 'auth/login',
  logout: 'auth/logout',
  signUp: 'auth/register',
  currentUserPreview: 'user/preview',
  updateUsername: 'user/username',
  getUsernamesArray: 'users/usernames',
  checkUsernameIsReserved: 'user/username-reserved',
  search: 'user/search',
  //posts
  posts: 'posts',
  likePost: (postId: string) => `posts/${postId}/like`,
  bookmarkPost: (postId: string) => `posts/${postId}/bookmark`,
  updatePost: (postId: string) => `posts/${postId}`,
  //drafts
  drafts: 'drafts',
  //notifications
  notifications: 'notifications',
}

export const pageRoutes = {
  home: '/',
  auth: '/auth',
  profile: '/users/:username',
  authSignup: '/auth/signup',
  signupFlow: '/signup-flow',
  createPost: '/create-post',
  post: '/post/:postId',
  drafts: '/drafts',
  notifications: '/notifications',
  bookmarks: '/bookmarks',
}
