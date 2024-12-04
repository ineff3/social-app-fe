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
  follow: (followeeId: string) => `user/${followeeId}/follow`,
  unfollow: (followeeId: string) => `user/${followeeId}/unfollow`,
  //posts
  posts: 'posts',
  likePost: (postId: string) => `posts/${postId}/like`,
  bookmarkPost: (postId: string) => `posts/${postId}/bookmark`,
  updatePost: (postId: string) => `posts/${postId}`,
  userPosts: (userId: string) => `user/${userId}/posts`,
  postComments: (postId: string) => `posts/${postId}/comments`,
  //drafts
  drafts: 'drafts',
  //notifications
  notifications: 'notifications',
  viewNotification: (id: string) => `notifications/${id}/view`,
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
