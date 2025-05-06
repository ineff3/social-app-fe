import { NotFoundScreen } from '@/src/components/ui/NotFoundScreen'

const ProfileNotFound = () => {
  return (
    <NotFoundScreen
      title="We couldn't find that profile"
      content="Make sure the username is correct or try searching again."
      className="h-screen"
      size="xl"
    />
  )
}

export default ProfileNotFound
