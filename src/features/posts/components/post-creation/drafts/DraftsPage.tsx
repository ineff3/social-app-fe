import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowIconSvg from '@/src/components/ui/icons/ArrowIconSvg'
import { DraftList } from './DraftList'
import { useDraftContext } from '../../../contexts/DraftContext'

export const DraftsPage = () => {
  const [editMode, setEditMode] = useState(false)
  const { deleteSelectedDrafts, selectAll, deselectAll, hasSelected } =
    useDraftContext()!
  const navigate = useNavigate()

  const changeMode = () => {
    setEditMode((prev) => {
      if (prev) {
        deselectAll()
      }
      return !prev
    })
  }

  return (
    <div className=" flex flex-1 flex-col">
      <div className=" flex items-center gap-4">
        <div data-tip="Back" className=" tooltip tooltip-secondary">
          <button
            aria-label="Move back"
            className=" btn btn-circle btn-ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowIconSvg width={18} height={18} fill="currentColor" />
          </button>
        </div>
        <div className=" flex flex-1 items-center justify-between">
          <p className=" text-lg font-semibold">Drafts</p>
          <button
            className="btn btn-ghost text-base text-primary"
            onClick={changeMode}
          >
            {!editMode ? 'Edit' : 'Done'}
          </button>
        </div>
      </div>
      <div className={` divider  `}></div>
      <div className=" h-[400px]">
        <DraftList editMode={editMode} />
      </div>
      <section className={` ${!editMode && 'hidden'}`}>
        <div className=" divider  divider-primary"></div>
        <div className=" flex flex-1 justify-between">
          {hasSelected ? (
            <button onClick={deselectAll} className=" btn btn-sm">
              Deselect All
            </button>
          ) : (
            <button onClick={selectAll} className=" btn btn-sm">
              Select All
            </button>
          )}
          <button
            onClick={deleteSelectedDrafts}
            className=" btn  btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  )
}
