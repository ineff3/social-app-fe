import UserIconLink from '@/src/components/ui/UserIconLink'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'

interface Props {
  onUserLinkClick: () => void
}

export const UserPreview = ({ onUserLinkClick }: Props) => {
  const user = useAppSelector(selectUserPreview)

  return (
    <div className=" flex items-center gap-2 sm:flex-col lg:flex-row">
      <UserIconLink
        onClick={onUserLinkClick}
        userImageUrl={user?.avatarUrl}
        username={user?.username}
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
