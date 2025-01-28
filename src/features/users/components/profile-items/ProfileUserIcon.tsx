import { toPx } from '@/src/common/converters/toPx'
import { FaUserCircle } from 'react-icons/fa'

interface Props {
  profileUrl?: string | null
}

const ICON_SIZE = 110

export const ProfileUserIcon = ({ profileUrl }: Props) => {
  return (
    <div
      className=" overflow-hidden rounded-full bg-base-100"
      style={{ width: toPx(ICON_SIZE), height: toPx(ICON_SIZE) }}
    >
      {profileUrl ? (
        <img
          src={profileUrl}
          alt="Profile Image"
          className="h-full w-full object-cover"
        />
      ) : (
        <FaUserCircle size={ICON_SIZE} />
      )}
    </div>
  )
}
