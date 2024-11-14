/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import {
  Control,
  FieldArrayWithId,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { useDeleteMultipleDrafts, useGetDrafts } from '../hooks/drafts/drafts'
import { SchemaPostResponseDto } from '@/src/types/schema'

interface checkboxItem {
  draft: SchemaPostResponseDto
  checked: boolean
}
interface IFormValues {
  drafts: checkboxItem[]
}

interface IDraftContextProps {
  control: Control<IFormValues>
  fields: FieldArrayWithId<IFormValues, 'drafts', 'id'>[]
  isFieldsLoading: boolean
  isFieldsError: boolean
  deleteSelectedDrafts: () => void
  selectAll: () => void
  deselectAll: () => void
  hasSelected: boolean
}

const DraftContext = createContext<IDraftContextProps | null>(null)

export const useDraftContext = () => {
  return useContext(DraftContext)
}

export const DraftProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useGetDrafts()
  const deleteMultipleDraftsMutation = useDeleteMultipleDrafts()

  const { control, getValues, setValue, watch } = useForm<IFormValues>({
    defaultValues: {
      drafts: [],
    },
    values: {
      drafts: data
        ? data.pages[0].data.map((draft) => ({ draft: draft, checked: false }))
        : [],
    },
  })
  const { fields } = useFieldArray({
    control,
    name: 'drafts',
  })
  const fieldsWatch = watch('drafts')
  let hasSelected = false
  if (fieldsWatch && fieldsWatch.length > 0) {
    hasSelected = fieldsWatch.some((el) => el.checked)
  }

  const deleteSelectedDrafts = () => {
    const data = getValues()
    const draftIds = data.drafts
      .filter((el) => el.checked)
      .map((el) => el.draft.id)

    deleteMultipleDraftsMutation.mutate({
      key: 'ids',
      value: draftIds,
    })
  }

  const selectAll = () => {
    const data = getValues()
    data.drafts.forEach((value, index) => {
      setValue(`drafts.${index}`, { ...value, checked: true })
    })
  }

  const deselectAll = () => {
    const data = getValues()
    data.drafts.forEach((value, index) => {
      setValue(`drafts.${index}`, { ...value, checked: false })
    })
  }

  return (
    <DraftContext.Provider
      value={{
        fields,
        isFieldsLoading: isLoading,
        isFieldsError: isError,
        control,
        deleteSelectedDrafts,
        selectAll,
        deselectAll,
        hasSelected,
      }}
    >
      {children}
    </DraftContext.Provider>
  )
}
