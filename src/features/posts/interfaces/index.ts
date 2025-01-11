import { SchemaPostResponseDto } from '@/src/generated/schema'
import { Location } from 'react-router-dom'

export interface CreatePostFormType {
  id?: string
  text: string
  postImages: { file: File }[]
  repostId?: string
}

export interface PostCreationLocationState {
  backgroundLocation?: Location
  repost?: SchemaPostResponseDto
}
