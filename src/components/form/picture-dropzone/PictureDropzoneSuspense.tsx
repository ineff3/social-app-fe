import { IconButton } from '../../media-handling/picture-selector/picture-selector-buttons/IconButton'

export const PictureDropzoneSuspense = <
  TFile extends { file: File; imageKey?: string },
>({
  value,
  pictureUrl,
  placeholderContent,
}: {
  value: TFile | null
  pictureUrl?: string | null
  placeholderContent?: React.ReactNode
}) => {
  const hasContent = value || pictureUrl

  return (
    <div className=" !relative h-full w-full ">
      {hasContent ? (
        <img
          src={value ? URL.createObjectURL(value.file) : pictureUrl ?? ''}
          className="h-full w-full object-cover"
        />
      ) : (
        placeholderContent
      )}

      <div className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2">
        <IconButton onClick={() => {}} disabled={true} />
      </div>
    </div>
  )
}
