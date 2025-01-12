import { useParams } from 'react-router-dom'
import useFetchUserProfile from '../hooks/useFetchUserProfile'
import ProfileNotFound from './ProfileNotFound'
import DescriptionPoints from './DescriptionPoints'
import { FaUserCircle } from 'react-icons/fa'
import { ProfileTabs } from './ProfileTabs'
import { CurrentUserActions } from './CurrentUserActions'
import { OtherUserActions } from './OtherUserActions'
import { BackCircleButton } from '@/src/components/ui/buttons/BackCircleButton'
import { Spinner } from '@/src/components/ui/spinners/Spinner'

export const ProfilePage = () => {
  const { username } = useParams()
  const { data, isPending, isError } = useFetchUserProfile(username!)

  if (isPending) {
    return (
      <div className=" mt-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return <ProfileNotFound />
  }

  const { user } = data

  return (
    <div className=" flex h-full flex-col">
      <header className=" flex items-center justify-start gap-4 border-b border-accent px-5 py-1.5">
        <BackCircleButton className="fill-secondary" size="sm" />

        <div className=" flex flex-col">
          <p className=" font-bold text-secondary">
            {user.firstName} {user.secondName}
          </p>
          <p className=" text-sm">{user.amountOfPosts} Posts</p>
        </div>
      </header>
      <div className=" h-[250px] bg-base-200">
        {user?.avatarUrl && (
          <img
            src={user?.backgroundUrl}
            alt="Background Image"
            className=" h-full w-full object-cover"
          />
        )}
      </div>

      <div className=" relative -top-[70px] mx-auto flex w-full max-w-screen-md flex-col gap-2">
        <div className=" px-10">
          <div className=" flex h-[140px] items-center justify-between">
            <div className=" h-[110px] w-[110px] overflow-hidden rounded-full bg-base-100">
              {user?.avatarUrl ? (
                <img
                  src={user?.backgroundUrl}
                  alt="Profile Image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUserCircle size={110} />
              )}
            </div>
            <div className=" self-end">
              {data.isCurrentUser ? (
                <CurrentUserActions />
              ) : (
                <OtherUserActions
                  isFollowing={data.isFollowing}
                  followeeId={user.id}
                  followeeUsername={user.username}
                />
              )}
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <div className=" flex flex-col">
              <p className=" font-bold text-secondary">{user.firstName}</p>
              <p className=" text-sm">@{user.username}</p>
            </div>
            {user?.bio && <p className=" text-sm text-secondary">{user.bio}</p>}
            <div>
              <DescriptionPoints userData={user} />
            </div>
          </div>
        </div>
        <div className=" mt-4">
          <ProfileTabs userId={user.id} />
        </div>
      </div>
    </div>
  )
}
