import { SchemaPostResponseDto } from '@/src/generated/schema'
import { useNavigate } from 'react-router-dom'
import { usePostContext } from '../../../contexts/PostContext'
import { useId } from 'react'

import { RepostBadge } from '../../post-items/RepostBadge'
import { PicturesGrid } from './PicturesGrid'

export const DraftRow = ({
  draft,
  editMode,
}: {
  draft: SchemaPostResponseDto
  editMode: boolean
}) => {
  const descId = useId()
  const { setValue, replacePostImages } = usePostContext()!
  const navigate = useNavigate()

  const handleDraftSelect = () => {
    setValue('id', draft.id, { shouldDirty: true })
    setValue('text', draft.text)
    if (draft.reposted?.id) {
      setValue('repostedId', draft.reposted.id)
    }
    replacePostImages(
      draft.postImages.map(({ id, imageKey, imageUrl }) => ({
        id: id,
        key: id,
        url: imageUrl,
        imageKey: imageKey,
        source: 'url',
      })),
    )

    navigate(-1)
  }

  return (
    <button
      aria-label="Select draft"
      aria-describedby={descId}
      onClick={handleDraftSelect}
      disabled={editMode}
      className={` btn btn-ghost flex h-20 flex-1 gap-3 bg-base-200 ${editMode && ' btn-disabled !bg-base-200'}`}
    >
      <div className=" relative flex flex-1 items-center justify-between gap-2 text-left">
        {draft.reposted && (
          <div className=" absolute -top-[20px]">
            <RepostBadge disabled={true} repostAuthor={draft.reposted.author} />
          </div>
        )}
        <p className=" text-base" id={descId}>
          {draft?.text}
        </p>
        <PicturesGrid postImages={draft.postImages} />
      </div>
    </button>
  )
}
