import { useState } from 'react'
import { Arrows } from './Arrows'
import { PictureElement } from './PictureElement'

const PICTURE_WIDTH = 215
const PICTURE_HEIGHT = 170
const PICTURE_GAP = 14

const SHOW_PER_PAGE = 2

export const AttachedPicturesCarousel = <
  TFile extends { id: string; file: File },
>({
  pictures,
  onRemove,
}: {
  pictures: TFile[]
  onRemove: (index: number) => void
}) => {
  const [page, setPage] = useState(0)

  const handleRemove = (pos: number) => {
    setPage((prevPage) => {
      if (prevPage !== 0) {
        return prevPage - 1
      }
      return prevPage
    })
    onRemove(pos)
  }

  if (pictures.length === 1) {
    const { file } = pictures[0]
    return (
      <div className=" flex w-full justify-end">
        <PictureElement
          file={file}
          index={0}
          height={240}
          width={240}
          onRemove={handleRemove}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        width: `${PICTURE_WIDTH * 2 + PICTURE_GAP}px`,
        height: `${PICTURE_HEIGHT}px`,
      }}
      className="relative overflow-hidden"
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${page * (PICTURE_WIDTH + PICTURE_GAP)}px)`,
          gap: `${PICTURE_GAP}px`,
        }}
      >
        {pictures.map(({ id, file }, index) => (
          <PictureElement
            key={id}
            file={file}
            index={index}
            onRemove={handleRemove}
            width={PICTURE_WIDTH}
            height={PICTURE_HEIGHT}
          />
        ))}
      </div>
      <Arrows
        hasNextPage={page + SHOW_PER_PAGE < pictures.length}
        hasPrevPage={page > 0}
        onNextPage={() => setPage((prev) => prev + 1)}
        onPrevPage={() => setPage((prev) => prev - 1)}
      />
    </div>
  )
}
