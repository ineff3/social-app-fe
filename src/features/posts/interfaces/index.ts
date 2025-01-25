import { SchemaPostResponseDto } from '@/src/generated/schema'
import { Location } from 'react-router-dom'

export interface PostPicture {
  id?: string
  file: File
  key: string
  imageKey?: string
}

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
