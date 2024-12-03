/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFieldArrayAppend } from 'react-hook-form'
import { useRef } from 'react'
import { CreatePostFormType } from '../../../interfaces'
import { ImageIcon } from '@/src/components/ui/icons'

interface Props {
  maxFilesAttached: boolean
  append: UseFieldArrayAppend<CreatePostFormType>
  imageTypes: string[]
}

export const AttachPicture = ({
  append,
  imageTypes,
  maxFilesAttached,
}: Props) => {
  const postImageRef = useRef<HTMLInputElement | null>(null)

  const onChooseFile = () => {
    postImageRef?.current?.click()
  }

  const handleAddDocuments = (event: any) => {
    const uploadedFiles = Array.from(event.target.files)
    const files = uploadedFiles.map((file) => ({
      file,
    })) as { file: File }[]
    append(files)

    if (postImageRef.current) {
      postImageRef.current.value = ''
    }
  }

  return (
    <>
      <div data-tip="Media" className=" tooltip tooltip-secondary">
        <button
          onClick={onChooseFile}
          type="button"
          className={` btn btn-circle btn-ghost btn-sm ${maxFilesAttached && 'btn-disabled !bg-base-200'}`}
        >
          <ImageIcon />
        </button>
      </div>

      <input
        disabled={maxFilesAttached}
        type="file"
        accept={imageTypes.join(', ')}
        className=" hidden"
        onChange={handleAddDocuments}
        ref={postImageRef}
      />
    </>
  )
}
