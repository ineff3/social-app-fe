import { SchemaCreatePostDto } from '@/src/generated/schema'
import { CreatePostFormType } from '../interfaces'

export const transformPostCreationData = (
  data: CreatePostFormType,
): SchemaCreatePostDto => {
  const { postImages, ...rest } = data
  return {
    ...rest,
    postImages: postImages.map((postImage) => postImage.uploadData!),
  }
}
