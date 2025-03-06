import UserIconLink from '@/src/components/ui/UserIconLink'
import { SchemaUserPreviewResponseDto } from '@/src/generated/schema'
import { format, parseISO } from 'date-fns'

interface Props {
  userPreview: SchemaUserPreviewResponseDto
}

export const ConversationUserPreview = ({
  userPreview: { username, firstName, createdAt, profileUrl },
}: Props) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-1.5 border-b border-accent pb-[85px] pt-5 text-sm">
      <UserIconLink
        username={username}
        iconSize="lg"
        userImageUrl={profileUrl}
      />
      <p className="font-medium text-secondary">{firstName}</p>
      <p>@{username}</p>
      {createdAt && (
        <p className="pt-4">
          Joined {format(parseISO(createdAt), 'MMMM dd, yyyy')}
        </p>
      )}
    </div>
  )
}
