import { SchemaPostResponseDto } from '@/src/types/schema'

export const updateLikedPost = (post: SchemaPostResponseDto) => {
  return {
    ...post,
    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    isLiked: !post.isLiked,
  }
}

export const updateBookmarkedPost = (post: SchemaPostResponseDto) => {
  return { ...post, isBookmarked: !post.isBookmarked }
}
