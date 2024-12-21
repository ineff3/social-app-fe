import UserIconLink from '@/src/components/ui/UserIconLink'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

export const ConversationUserPreview = ({ userPreview }: Props) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-1.5 border-b border-accent pb-28 pt-5">
      <UserIconLink username={userPreview.username} iconSize="lg" />
      <p className=" text-sm font-medium text-secondary">
        {userPreview.firstName}
      </p>
      <p className="text-sm">{userPreview.username}</p>
    </div>
  )
}
