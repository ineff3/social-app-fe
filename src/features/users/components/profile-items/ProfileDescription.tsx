import { SchemaUserResponseDto } from '@/src/generated/schema'
import { DescriptionPoints } from '../DescriptionPoints'

interface Props {
  user: SchemaUserResponseDto
}

export const ProfileDescription = ({ user }: Props) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex flex-col">
        <p className=" font-bold text-secondary">{user.firstName}</p>
        <p className=" text-sm">@{user.username}</p>
      </div>
      {user?.bio && <p className=" text-sm text-secondary">{user.bio}</p>}
      <div>
        <DescriptionPoints user={user} />
      </div>
    </div>
  )
}
