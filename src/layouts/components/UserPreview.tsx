import UserIconLink from '@/src/components/ui/UserIconLink'
import { SchemaUserPreviewResponseDto } from '@/src/types/schema'

interface Props {
  onUserLinkClick?: () => void
  user: SchemaUserPreviewResponseDto
  disabledLink?: boolean
  isResponsive: boolean
}

export const UserPreview = ({
  onUserLinkClick,
  user,
  disabledLink,
  isResponsive,
}: Props) => {
  return (
    <div
      className={` flex items-center gap-2  ${isResponsive && 'sm:flex-col lg:flex-row'}`}
    >
      <UserIconLink
        onClick={onUserLinkClick}
        userImageUrl={user?.avatarUrl}
        username={user?.username}
        disabled={disabledLink}
      />
      <div
        className={` flex w-full items-center justify-between  ${isResponsive ? 'sm:justify-center lg:justify-between' : 'justify-between'}`}
      >
        <div
          className={` flex flex-col ${isResponsive && 'sm:hidden lg:flex'}`}
        >
          <p className=" text-secondary">{user?.firstName}</p>
          <p className=" text-sm ">@{user?.username}</p>
        </div>
      </div>
    </div>
  )
}
