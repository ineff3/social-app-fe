/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useRef } from 'react'
import {
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { CreatePostFormType, PostCreationLocationState } from '../interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import validationSchema from '../schemas/createPostSchema'
import { useCreateDraft, useUpdateDraft } from '../hooks/drafts/drafts'
import { constructPostFormData } from '../utils/constructPostFormData'
import { useLocation } from 'react-router-dom'
import { Editor } from '@tiptap/react'
import { ComponentWithChildrenProps } from '@/src/common/props'

interface IPostContextProps extends UseFormReturn<CreatePostFormType> {
  createDraft: () => void
  addEmojiToText: (value: string) => void
  postImages: FieldArrayWithId<CreatePostFormType, 'postImages', 'id'>[]
  appendPostImage: UseFieldArrayAppend<CreatePostFormType, 'postImages'>
  removePostImage: UseFieldArrayRemove
  setEditor: (editor: Editor | null) => void
}

const PostContext = createContext<IPostContextProps | null>(null)
export const usePostContext = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }: ComponentWithChildrenProps) => {
  const location = useLocation()
  const repost = (location.state as PostCreationLocationState)?.repost
  const formMethods = useForm<CreatePostFormType>({
    mode: 'onChange',
    defaultValues: {
      text: '',
      postImages: [],
      repostId: repost?.id,
    },
    resolver: zodResolver(validationSchema),
  })

  const {
    fields: postImages,
    append: appendPostImage,
    remove: removePostImage,
  } = useFieldArray({
    control: formMethods.control,
    name: 'postImages',
  })

  const draftId = formMethods.watch('id')

  const createDraftMutation = useCreateDraft()
  const updateDraftMutation = useUpdateDraft(draftId!)

  const editorRef = useRef<Editor | null>(null)

  const setEditor = (editor: Editor | null) => {
    editorRef.current = editor
  }

  const createDraft = () => {
    const formValues = formMethods.getValues()
    const formData = constructPostFormData(formValues)

    if (formValues.id) {
      updateDraftMutation.mutate(formData, {
        onSettled: () => {
          formMethods.reset()
        },
      })
    } else {
      formData.append('isDraft', 'true')
      createDraftMutation.mutate(formData, {
        onSettled: () => {
          formMethods.reset()
        },
      })
    }
  }

  const addEmojiToText = (emoji: string) => {
    if (editorRef.current) {
      editorRef.current.chain().insertContent(emoji).run()
    }
  }

  return (
    <PostContext.Provider
      value={{
        ...formMethods,
        createDraft,
        addEmojiToText,
        postImages,
        appendPostImage,
        removePostImage,
        setEditor,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
