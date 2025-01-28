import { BackCircleButton } from '@/src/components/ui/buttons/BackCircleButton'
import { SchemaUserResponseDto } from '@/src/generated/schema'

interface Props {
  user: SchemaUserResponseDto
}
export const ProfileHeader = ({
  user: { firstName, secondName, amountOfPosts },
}: Props) => {
  return (
    <header className=" flex items-center justify-start gap-4 border-b border-accent px-5 py-1.5">
      <BackCircleButton className="fill-secondary" size="sm" />

      <div className=" flex flex-col">
        <p className=" font-bold text-secondary">
          {firstName} {secondName}
        </p>
        <p className=" text-sm">{amountOfPosts} Posts</p>
      </div>
    </header>
  )
}
