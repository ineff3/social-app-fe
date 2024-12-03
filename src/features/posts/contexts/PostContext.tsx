/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext } from 'react'
import {
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { CreatePostFormType } from '../interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import validationSchema from '../schemas/createPostSchema'
import { useCreateDraft, useUpdateDraft } from '../hooks/drafts/drafts'
import { constructPostFormData } from '../utils/constructPostFormData'

interface IPostContextProps extends UseFormReturn<CreatePostFormType> {
  createDraft: () => void
  appendEmoji: (emoji: any) => void
  postImages: FieldArrayWithId<CreatePostFormType, 'postImages', 'id'>[]
  appendPostImage: UseFieldArrayAppend<CreatePostFormType, 'postImages'>
  removePostImage: UseFieldArrayRemove
}

const PostContext = createContext<IPostContextProps | null>(null)
export const usePostContext = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const formMethods = useForm<CreatePostFormType>({
    mode: 'onChange',
    defaultValues: {
      text: '',
      postImages: [],
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

  const appendEmoji = (emoji: any) => {
    console.log(emoji)
    // const currentValue = textArea
    // const newValue = `${currentValue}${emoji?.native}`
    // setValue('text', newValue)
  }

  return (
    <PostContext.Provider
      value={{
        ...formMethods,
        createDraft,
        appendEmoji,
        postImages,
        appendPostImage,
        removePostImage,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
