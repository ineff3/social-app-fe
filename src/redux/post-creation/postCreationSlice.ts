import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface PostContent {
  id?: string
  text?: string
  images?: { file: File }[]
}
interface PostCreationInitialState {
  content?: PostContent
}

const postCreationInitialState: PostCreationInitialState = {}

const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState: postCreationInitialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostContent>) => {
      state.content = action.payload
    },
  },
})

export const { setPost } = postCreationSlice.actions

export const selectPostContent = (state: RootState) =>
  state.postCreation.content

export default postCreationSlice.reducer
