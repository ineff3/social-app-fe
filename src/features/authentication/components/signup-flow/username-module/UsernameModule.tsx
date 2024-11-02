import GeneratedUsernames from './GeneratedUsernames'
import UsernameInput from './UsernameInput'
import useUpdateUsername from '../../../hooks/useUpdateUsername'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { useQuery } from '@tanstack/react-query'
import useQueryKeyStore from '@/src/utils/api/hooks/useQueryKeyStore'
import { useState } from 'react'

interface Props {
  next: () => void
}

const UsernameModule = ({ next }: Props) => {
  const initialUsername = useAppSelector(selectUserPreview)!.username
  const [debouncedUsername, setDebouncedUsername] = useState(initialUsername)
  const [isDebounceLoading, setIsDebounceLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)

  const queryKeyStore = useQueryKeyStore()
  const { data, isLoading } = useQuery({
    ...queryKeyStore.users.isUsernameReserved(debouncedUsername),
    enabled: debouncedUsername !== initialUsername,
  })

  const updateUsernameMutation = useUpdateUsername()

  const onSubmit = () => {
    if (debouncedUsername !== initialUsername) {
      updateUsernameMutation.mutate({
        username: debouncedUsername.trim(),
      })
    }
    next()
  }

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

        <UsernameInput
          key={debouncedUsername}
          isLoading={isLoading}
          isReserved={data?.isReserved}
          debouncedUsername={debouncedUsername}
          setDebouncedUsername={setDebouncedUsername}
          isDebounceLoading={isDebounceLoading}
          setIsDebounceLoading={setIsDebounceLoading}
          isValid={isValid}
          setIsValid={setIsValid}
        />
        <GeneratedUsernames setDebouncedUsername={setDebouncedUsername} />
      </div>
      <button
        onClick={onSubmit}
        className={`btn ${(!isValid || isLoading || isDebounceLoading || data?.isReserved) && ' btn-disabled !bg-base-200'} ${debouncedUsername === initialUsername ? ' btn-accent' : 'btn-primary'}`}
      >
        {debouncedUsername === initialUsername ? <>Skip for now</> : <>Next</>}
      </button>
    </>
  )
}

export default UsernameModule
