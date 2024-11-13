import { Controller } from 'react-hook-form'
import { useDraftContext } from '../../contexts/DraftContext'
import { Checkbox } from '@headlessui/react'
import { DraftRow } from './DraftRow'
import ErrorAlert from '@/src/components/ui/ErrorAlert'

interface Props {
  editMode: boolean
}

export const DraftList = ({ editMode }: Props) => {
  const { fields, control, isFieldsLoading, isFieldsError } = useDraftContext()!

  if (isFieldsLoading) {
    return (
      <div className=" flex h-full justify-center">
        <span className=" loading loading-spinner loading-lg items-center"></span>
      </div>
    )
  }

  if (isFieldsError) {
    return (
      <ErrorAlert errorMessage="Something went wrong. Please try again later." />
    )
  }

  return (
    <div className=" flex max-h-[360px] flex-col gap-3 overflow-hidden overflow-y-auto">
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
