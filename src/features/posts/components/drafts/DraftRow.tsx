import { SchemaPostResponseDto } from '@/src/types/schema'
import { useNavigate } from 'react-router-dom'
import { usePostContext } from '../../contexts/PostContext'

export const DraftRow = ({
  draft,
  editMode,
}: {
  draft: SchemaPostResponseDto
  editMode: boolean
}) => {
  const { setValue } = usePostContext()!
  const navigate = useNavigate()

  const handleDraftSelect = () => {
    setValue('id', draft.id, { shouldDirty: true })
    setValue('text', draft.text)
    // Todo: get images as a blob and set them

    navigate(-1)
  }

  return (
    <button
      onClick={handleDraftSelect}
      className={`  btn  btn-ghost h-20 w-full gap-3 bg-base-200 ${editMode && ' btn-disabled !bg-base-200'}`}
    >
      <div className=" flex flex-1 items-center justify-between gap-2 text-left">
        {draft?.text ? <p>{draft.text}</p> : <p> </p>}
        {draft?.imageUrls && (
          <div className=" h-[60px] w-[60px] flex-shrink-0">
            <div
              className={`grid ${
                draft?.imageUrls.length === 1
                  ? 'grid-cols-1 grid-rows-1'
                  : draft?.imageUrls.length === 2
                    ? 'grid-cols-2 grid-rows-1'
                    : draft?.imageUrls.length === 3
                      ? 'grid-cols-2 grid-rows-2'
                      : 'grid-cols-2 grid-rows-2'
              } h-full w-full gap-1`}
            >
              {draft.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={url}
                    alt="Draft image"
                    className={`object-cover ${
                      draft.imageUrls && draft.imageUrls.length === 1
                        ? 'h-full w-full'
                        : 'h-[30px] w-[30px]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  )
}
