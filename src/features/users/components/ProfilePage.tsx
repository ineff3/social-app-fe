import { useParams } from 'react-router-dom'
import useFetchUserProfile from '../hooks/useFetchUserProfile'
import ProfileNotFound from './ProfileNotFound'
import { ProfileTabs } from './ProfileTabs'
import { CurrentUserActions } from './profile-actions/CurrentUserActions'
import { NonCurrentUserActions } from './profile-actions/NonCurrentUserActions'
import { Spinner } from '@/src/components/ui/spinners/Spinner'
import { ProfileBackgroundImage } from './profile-items/ProfileBackgroundImage'
import { ProfileHeader } from './profile-items/ProfileHeader'
import { ProfileUserIcon } from './profile-items/ProfileUserIcon'
import { ProfileDescription } from './profile-items/ProfileDescription'
import { Helmet } from 'react-helmet-async'

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
    <>
      <Helmet>
        <title>{`${username}'s Profile | Linker`}</title>
        <meta
          name="description"
          content={`View ${username}'s profile, posts, and interactions on Linker.`}
        />
        <meta property="og:title" content={`${username}'s Profile | Linker`} />
        <meta
          property="og:description"
          content={`Check out ${username}'s latest posts and engage with their content.`}
        />
        <meta property="og:type" content="profile" />
      </Helmet>

      <div className=" flex h-full flex-col">
        <ProfileHeader user={user} />

        <ProfileBackgroundImage backgroundUrl={user?.backgroundUrl} />

        <div className=" relative -top-[70px] mx-auto flex w-full max-w-screen-md flex-col gap-2">
          <div className=" px-10">
            <div className=" flex h-[140px] items-center justify-between">
              <ProfileUserIcon profileUrl={user?.profileUrl} />

              <div className=" self-end">
                {data.isCurrentUser ? (
                  <CurrentUserActions user={user} />
                ) : (
                  <NonCurrentUserActions
                    isFollowing={data.isFollowing}
                    followeeId={user.id}
                    followeeUsername={user.username}
                  />
                )}
              </div>
            </div>

            <ProfileDescription user={user} />
          </div>

          <div className=" mt-4">
            <ProfileTabs userId={user.id} />
          </div>
        </div>
      </div>
    </>
  )
}
