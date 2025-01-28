interface Props {
  backgroundUrl?: string | null
}

export const ProfileBackgroundImage = ({ backgroundUrl }: Props) => {
  return (
    <div className=" h-[250px] bg-base-200">
      {backgroundUrl && (
        <img
          src={backgroundUrl}
          alt="Background Image"
          className=" h-full w-full object-cover"
        />
      )}
    </div>
  )
}
