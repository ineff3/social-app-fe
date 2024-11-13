/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { CreatePostFormType } from '../interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import validationSchema from '../schemas/createPostSchema'
import useCreatePost from '../hooks/useCreatePost'
import { AxiosError } from 'axios'
import { useCreateDraft, useUpdateDraft } from '../hooks/drafts/drafts'

interface IPostContextProps {
  register: UseFormRegister<CreatePostFormType>
  setValue: UseFormSetValue<CreatePostFormType>
  submitForm: () => void
  createDraft: () => void
  creationError: string | null
  isDirty: boolean
  appendEmoji: (emoji: any) => void
  postImages: FieldArrayWithId<CreatePostFormType, 'postImages', 'id'>[]
  appendPostImage: UseFieldArrayAppend<CreatePostFormType, 'postImages'>
  removePostImage: UseFieldArrayRemove
  errors: FieldErrors<CreatePostFormType>
  postIsPending: boolean
}

const PostContext = createContext<IPostContextProps | null>(null)
export const usePostContext = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [creationError, setCreationError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    control,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<CreatePostFormType>({
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
    control,
    name: 'postImages',
  })

  const draftId = watch('id')

  const createPostMutation = useCreatePost()
  const createDraftMutation = useCreateDraft()
  const updateDraftMutation = useUpdateDraft(draftId!)

  const constructFormData = (data: CreatePostFormType) => {
    const formData = new FormData()
    data.postImages.forEach(({ file }) => {
      formData.append('images', file)
    })
    formData.append('text', data.text)
    return formData
  }

  const submitForm = handleSubmit((data) => {
    const formData = constructFormData(data)

    createPostMutation.mutate(formData, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          setCreationError(
            error.response?.data?.message || 'Something went wrong',
          )
        }
      },
      onSuccess: () => {
        navigate(-1)
      },
    })
  })

  const createDraft = () => {
    const formValues = getValues()
    const formData = constructFormData(formValues)

    if (formValues.id) {
      updateDraftMutation.mutate(formData, {
        onSettled: () => {
          reset()
        },
      })
    } else {
      formData.append('isDraft', 'true')
      createDraftMutation.mutate(formData, {
        onSettled: () => {
          reset()
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
        register,
        setValue,
        submitForm,
        createDraft,
        creationError,
        isDirty,
        appendEmoji,
        postImages,
        appendPostImage,
        removePostImage,
        errors,
        postIsPending: createPostMutation.isPending,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
