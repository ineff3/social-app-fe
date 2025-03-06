import {
  SchemaPostResponseDto,
  SchemaUploadImageResponseDto,
} from '@/src/generated/schema'
import { Location } from 'react-router-dom'

interface BasePostPicture {
  id?: string
  key: string
  uploadData?: SchemaUploadImageResponseDto
}

interface PostPictureFile extends BasePostPicture {
  file: File
  source: 'file'
}

interface PostPictureUrl extends BasePostPicture {
  url: string
  source: 'url'
}

export type PostPicture = PostPictureFile | PostPictureUrl

export interface CreatePostFormType {
  id?: string
  text: string
  postImages: PostPicture[]
  repostedId?: string
}

export interface PostCreationLocationState {
  backgroundLocation?: Location
  repost?: SchemaPostResponseDto
}
