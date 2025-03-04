import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const iconSizes = {
  sm: 25,
  md: 45,
  lg: 65,
}

type IconSize = keyof typeof iconSizes

interface Props {
  username?: string
  userImageUrl?: string | null
  onClick?: () => void
  disabled?: boolean
  iconSize?: IconSize
}

const UserIconLink = ({
  username,
  userImageUrl,
  onClick,
  disabled,
  iconSize = 'md',
}: Props) => {
  return (
    <>
      <Link
        tabIndex={-1}
        to={'/users/' + username || ''}
        className={`h-[45px] w-[45px] flex-shrink-0 overflow-hidden rounded-full ${disabled && 'pointer-events-none'}`}
        onClick={onClick}
        style={{
          height: `${iconSizes[iconSize]}px`,
          width: `${iconSizes[iconSize]}px`,
        }}
        aria-label={`Profile of ${username}`}
      >
        {userImageUrl ? (
          <img
            src={userImageUrl}
            alt="Profile image"
            className="h-full w-full object-cover"
          />
        ) : (
          <FaUserCircle size={iconSizes[iconSize]} />
        )}
      </Link>
    </>
  )
}

export default UserIconLink
