import { PostPicture } from '@/src/features/posts/interfaces'

export const getPostPictureSource = (postPicture: PostPicture) => {
  return postPicture.source === 'file'
    ? URL.createObjectURL(postPicture.file)
    : postPicture.url
}
