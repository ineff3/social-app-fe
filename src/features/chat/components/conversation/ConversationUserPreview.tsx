import UserIconLink from '@/src/components/ui/UserIconLink'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'
import { format, parseISO } from 'date-fns'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

export const ConversationUserPreview = ({ userPreview }: Props) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-1.5 border-b border-accent pb-[85px] pt-5 text-sm">
      <UserIconLink username={userPreview.username} iconSize="lg" />
      <p className="font-medium text-secondary">{userPreview.firstName}</p>
      <p>{userPreview.username}</p>
      <p className="pt-4">
        Joined {format(parseISO(userPreview.createdAt), 'MMMM dd, yyyy')}
      </p>
    </div>
  )
}
