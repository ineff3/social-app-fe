import ImageFileDropzone from '@/src/components/form/ImageFileDropzone'
import { Control, Controller } from 'react-hook-form'
import { EditProfileFormType } from '../../schemas'

export const BackgroundImageSection = ({
  control,
}: {
  control: Control<EditProfileFormType>
}) => {
  return (
    <div className=" h-[190px] bg-base-200">
      <Controller
        control={control}
        name="backgroundImage"
        render={({ field }) => (
          <ImageFileDropzone onChange={field.onChange} value={field.value} />
        )}
      />
    </div>
  )
}
