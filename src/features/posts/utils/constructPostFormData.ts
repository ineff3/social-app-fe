import { CreatePostFormType } from '../interfaces'

export const constructPostFormData = (data: CreatePostFormType) => {
  const formData = new FormData()
  data.postImages.forEach(({ file }) => {
    formData.append('images', file)
  })
  formData.append('text', data.text)
  if (data.repostId) {
    formData.append('repostedId', data.repostId)
  }
  return formData
}
