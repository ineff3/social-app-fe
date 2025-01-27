/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useRef, useState } from 'react'
import {
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayReplace,
  UseFieldArrayUpdate,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { CreatePostFormType, PostCreationLocationState } from '../interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import validationSchema from '../schemas/createPostSchema'
import { useCreateDraft, useUpdateDraft } from '../hooks/drafts/drafts'
import { useLocation } from 'react-router-dom'
import { Editor } from '@tiptap/react'
import { ComponentWithChildrenProps } from '@/src/common/props'
import { transformPostCreationData } from '../utils/transformPostCreationData'

interface IPostContextProps extends UseFormReturn<CreatePostFormType> {
  createDraft: () => void
  addEmojiToText: (value: string) => void
  postImages: FieldArrayWithId<CreatePostFormType, 'postImages', 'id'>[]
  appendPostImage: UseFieldArrayAppend<CreatePostFormType, 'postImages'>
  removePostImage: UseFieldArrayRemove
  updatePostImages: UseFieldArrayUpdate<CreatePostFormType, 'postImages'>
  replacePostImages: UseFieldArrayReplace<CreatePostFormType, 'postImages'>
  setEditor: (editor: Editor | null) => void
  isImageUploading: boolean
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

const PostContext = createContext<IPostContextProps | null>(null)
export const usePostContext = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }: ComponentWithChildrenProps) => {
  const location = useLocation()
  const repost = (location.state as PostCreationLocationState)?.repost
  const [isImageUploading, setIsImageUploading] = useState(false)
  const formMethods = useForm<CreatePostFormType>({
    mode: 'onChange',
    defaultValues: {
      text: '',
      postImages: [],
      repostedId: repost?.id,
    },
    resolver: zodResolver(validationSchema),
  })

  const {
    fields: postImages,
    append: appendPostImage,
    remove: removePostImage,
    update: updatePostImages,
    replace: replacePostImages,
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
    const data = formMethods.getValues()
    const transformedData = transformPostCreationData(data)
    if (data.id) {
      updateDraftMutation.mutate(transformedData, {
        onSettled: () => {
          formMethods.reset()
        },
      })
    } else {
      createDraftMutation.mutate(
        { ...transformedData, isDraft: true },
        {
          onSettled: () => {
            formMethods.reset()
          },
        },
      )
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
        updatePostImages,
        replacePostImages,
        setEditor,
        isImageUploading,
        setIsImageUploading,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
