import UserIconLink from '@/src/components/ui/UserIconLink'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'

interface Props {
  onUserLinkClick?: () => void
  user: SchemaUserPreviewResponseDto
  disabledLink?: boolean
}

export const UserPreview = ({ onUserLinkClick, user, disabledLink }: Props) => {
  return (
    <div className=" flex items-center gap-2 sm:flex-col lg:flex-row">
      <UserIconLink
        onClick={onUserLinkClick}
        userImageUrl={user?.avatarUrl}
        username={user?.username}
        disabled={disabledLink}
      />
      <div className=" flex w-full items-center justify-between sm:justify-center lg:justify-between ">
        <div className=" flex flex-col sm:hidden lg:flex">
          <p className=" text-secondary">{user?.firstName}</p>
          <p className=" text-sm ">@{user?.username}</p>
        </div>
      </div>
    </div>
  )
}
