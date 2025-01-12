import { Controller } from 'react-hook-form'
import { Checkbox } from '@headlessui/react'
import { DraftRow } from './DraftRow'
import ErrorAlert from '@/src/components/ui/ErrorAlert'
import { useDraftContext } from '../../../contexts/DraftContext'
import { Spinner } from '@/src/components/ui/spinners/Spinner'

interface Props {
  editMode: boolean
}

export const DraftList = ({ editMode }: Props) => {
  const { fields, control, isFieldsLoading, isFieldsError } = useDraftContext()!

  if (isFieldsLoading) {
    return (
      <div className=" flex h-full justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isFieldsError) {
    return (
      <ErrorAlert errorMessage="Something went wrong. Please try again later." />
    )
  }

  return (
    <div className=" flex max-h-[360px] w-full flex-col gap-3 overflow-y-auto px-4">
      {fields.map((field, index) => (
        <div key={field.id} className=" flex items-center gap-3">
          {editMode && (
            <Controller
              control={control}
              name={`drafts.${index}.checked`}
              render={({ field }) => (
                <Checkbox
                  onChange={field.onChange}
                  checked={field.value}
                  className="checkbox"
                />
              )}
            />
          )}
          <DraftRow editMode={editMode} draft={field.draft} />
        </div>
      ))}
    </div>
  )
}
