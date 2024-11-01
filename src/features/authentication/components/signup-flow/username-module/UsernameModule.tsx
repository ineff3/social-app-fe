// import GeneratedUsernames from './GeneratedUsernames'
import UsernameInput from './UsernameInput'
import useUpdateUsername from '../../../hooks/useUpdateUsername'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { selectSignupUsername } from '@/src/redux/signup/signupSlice'
import { isUsernameValid } from './common/isUsernameValid'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'

interface Props {
  next: () => void
}

const UsernameModule = ({ next }: Props) => {
  const initialUsername = useAppSelector(selectUserPreview)!.username
  const actualUsername = useAppSelector(selectSignupUsername)
  const queryKeyStore = useQueryKeyStore()
  const { data, isLoading } = useQuery({
    ...queryKeyStore.users.isUsernameReserved(
      actualUsername || initialUsername,
    ),
    enabled: !!actualUsername,
  })

  const updateUsernameMutation = useUpdateUsername()

  const onSubmit = () => {
    if (actualUsername && actualUsername !== initialUsername) {
      updateUsernameMutation.mutate({
        username: actualUsername.trim(),
      })
    }
    next()
  }

  const isValid = isUsernameValid(actualUsername)

  return (
    <>
      <div className=" flex flex-1 flex-col gap-5">
        <div>
          <p className=" text-2xl font-bold text-secondary">
            What should we call you?
          </p>
          <p className=" text-sm">
            Your @username is unique. You can always change it later.
          </p>
        </div>

        <UsernameInput isLoading={isLoading} isReserved={data?.isReserved} />
        {/* <GeneratedUsernames setUsername={setUsername} /> */}
      </div>
      <button
        onClick={onSubmit}
        className={`btn ${(!isValid || isLoading) && ' btn-disabled !bg-base-200'} ${actualUsername === initialUsername ? ' btn-accent' : 'btn-primary'}`}
      >
        {actualUsername === initialUsername ? <>Skip for now</> : <>Next</>}
      </button>
    </>
  )
}

export default UsernameModule
