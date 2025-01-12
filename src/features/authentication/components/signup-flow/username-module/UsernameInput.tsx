import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ErrorIconSvg } from '@/src/components/ui/icons/ErrorIconSvg'
import {
  isUsernameValid,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from './common/isUsernameValid'
import { Spinner } from '@/src/components/ui/spinners/Spinner'

interface Props {
  isReserved?: boolean
  isLoading: boolean
  debouncedUsername: string
  setDebouncedUsername: Dispatch<SetStateAction<string>>
  isDebounceLoading: boolean
  setIsDebounceLoading: Dispatch<SetStateAction<boolean>>
  isValid: boolean
  setIsValid: Dispatch<SetStateAction<boolean>>
}

const UsernameInput = ({
  isReserved,
  isLoading,
  debouncedUsername,
  setDebouncedUsername,
  isDebounceLoading,
  setIsDebounceLoading,
  isValid,
  setIsValid,
}: Props) => {
  const [inputValue, setInputValue] = useState(debouncedUsername)

  useEffect(
    function debounceUsername() {
      if (isValid) {
        setIsDebounceLoading(true)
        const timeout = setTimeout(() => {
          setDebouncedUsername(inputValue)
          setIsDebounceLoading(false)
        }, 1000)

        return () => {
          clearTimeout(timeout)
          setIsDebounceLoading(false)
        }
      }
    },
    [isValid, inputValue, setDebouncedUsername, setIsDebounceLoading],
  )

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-secondary">Enter a username:</span>
      </div>
      <label className="input input-primary flex items-center gap-2">
        <span className=" text-primary">@</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            const val = e.target.value
            setInputValue(val)
            setIsValid(isUsernameValid(val))
          }}
          className=" flex flex-1"
        />
        {isLoading || isDebounceLoading ? (
          <Spinner />
        ) : isReserved || !isValid ? (
          <ErrorIconSvg width="27" height="27" />
        ) : (
          <img className=" w-[27px]" src="./correct.png" alt="correct" />
        )}
      </label>
      {!isValid && (
        <div className="label">
          <span className="label-text-alt text-error">
            Username should be between {USERNAME_MIN_LENGTH} and{' '}
            {USERNAME_MAX_LENGTH} character length
          </span>
        </div>
      )}
    </label>
  )
}

export default UsernameInput
