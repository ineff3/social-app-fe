import { useState } from 'react'
import { DraftList } from './DraftList'
import { useDraftContext } from '../../../contexts/DraftContext'
import { BackCircleButton } from '@/src/components/ui/buttons/BackCircleButton'
import { Helmet } from 'react-helmet-async'

export const DraftsPage = () => {
  const [editMode, setEditMode] = useState(false)
  const { deleteSelectedDrafts, selectAll, deselectAll, hasSelected } =
    useDraftContext()!

  const changeMode = () => {
    setEditMode((prev) => {
      if (prev) {
        deselectAll()
      }
      return !prev
    })
  }

  return (
    <>
      <Helmet>
        <title>Drafts | Linker</title>
        <meta
          name="description"
          content="Manage your drafted posts and publish them when ready."
        />
        <meta property="og:title" content="Drafts | Linker" />
        <meta
          property="og:description"
          content="Work on your drafts and publish them when you're ready."
        />
      </Helmet>
      <div className=" flex flex-1 flex-col">
        <div className=" flex items-center gap-4">
          <BackCircleButton />
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
    </>
  )
}
