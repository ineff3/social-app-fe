/* eslint-disable react-refresh/only-export-components */
import { ComponentWithChildrenProps } from '@/src/common/props'
import { createContext, useContext, useState } from 'react'
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { messageValidationSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageFormType } from '../interfaces'

interface Props
  extends UseFormReturn<MessageFormType>,
    UseFieldArrayReturn<MessageFormType> {
  caretPosition: number
  setCaretPosition: React.Dispatch<React.SetStateAction<number>>
  isImageUploading: boolean
  setIsImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

const MessageFormContext = createContext<Props | null>(null)
export const useMessageFormContext = () => {
  return useContext(MessageFormContext)
}

export const MessageFormProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [caretPosition, setCaretPosition] = useState<number>(0)
  const [isImageUploading, setIsImageUploading] = useState(false)

  const formMethods = useForm<MessageFormType>({
    resolver: zodResolver(messageValidationSchema),
    defaultValues: { text: '', messageImages: [] },
  })

  const fieldArrayMethods = useFieldArray({
    control: formMethods.control,
    name: 'messageImages',
  })

  return (
    <MessageFormContext.Provider
      value={{
        ...formMethods,
        ...fieldArrayMethods,
        caretPosition,
        setCaretPosition,
        isImageUploading,
        setIsImageUploading,
      }}
    >
      {children}
    </MessageFormContext.Provider>
  )
}
