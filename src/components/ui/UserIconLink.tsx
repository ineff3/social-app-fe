import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface Props {
  username?: string
  userImageUrl?: string
  onClick?: () => void
  disabled?: boolean
}

const UserIconLink = ({ username, userImageUrl, onClick, disabled }: Props) => {
  return (
    <>
      <Link
        tabIndex={-1}
        to={'/users/' + username || ''}
        className={`h-[45px] w-[45px] flex-shrink-0 overflow-hidden rounded-full ${disabled && 'pointer-events-none'}`}
        onClick={onClick}
      >
        {userImageUrl ? (
          <img
            src={userImageUrl}
            alt="Profile image"
            className="h-full w-full object-cover"
          />
        ) : (
          <FaUserCircle size={45} />
        )}
      </Link>
    </>
  )
}

export default UserIconLink
