import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  setSignupLoading,
  setSignupUsername,
} from '@/src/redux/signup/signupSlice'
import { isUsernameValid } from './common/isUsernameValid'
import { selectUserPreview } from '@/src/redux/user/userSlice'

interface Props {
  isReserved?: boolean
  isLoading: boolean
}

const UsernameInput = ({ isReserved, isLoading }: Props) => {
  const dispatch = useAppDispatch()
  const initialUsername = useAppSelector(selectUserPreview)!.username
  const [usernameInputValue, setUsernameInputValue] = useState(initialUsername)
  const [debouncedUsername, setDebouncedUsername] = useState(initialUsername)
  const [isDebounceLoading, setIsDebounceLoading] = useState(false)

  useEffect(
    function debounceUsername() {
      setIsDebounceLoading(true)
      const timeout = setTimeout(() => {
        setDebouncedUsername(usernameInputValue)
      }, 1500)

      return () => {
        clearTimeout(timeout)
        setIsDebounceLoading(false)
      }
    },
    [usernameInputValue],
  )

  useEffect(
    function syncDebouncedUsername() {
      if (initialUsername !== debouncedUsername) {
        dispatch(setSignupUsername(debouncedUsername))
      }
    },
    [debouncedUsername, dispatch, initialUsername],
  )

  useEffect(
    function syncDebouncedLoading() {
      dispatch(setSignupLoading(isDebounceLoading))
    },
    [isDebounceLoading, dispatch],
  )

  const isValid = isUsernameValid(debouncedUsername)

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-secondary">Enter a username:</span>
      </div>
      <label className="input input-primary flex items-center gap-2">
        <span className=" text-primary">@</span>
        <input
          type="text"
          value={usernameInputValue}
          onChange={(e) => setUsernameInputValue(e.target.value)}
          className=" flex flex-1"
        />
        {isLoading || isDebounceLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : isReserved ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="3 3 16 16"
            width="27"
            height="27"
          >
            <circle
              cx="11"
              cy="-1041.36"
              r="8"
              transform="matrix(1 0 0-1 0-1030.36)"
              opacity=".98"
              fill="#da4453"
            />
            <path
              d="m-26.309 18.07c-1.18 0-2.135.968-2.135 2.129v12.82c0 1.176.948 2.129 2.135 2.129 1.183 0 2.135-.968 2.135-2.129v-12.82c0-1.176-.946-2.129-2.135-2.129zm0 21.348c-1.18 0-2.135.954-2.135 2.135 0 1.18.954 2.135 2.135 2.135 1.181 0 2.135-.954 2.135-2.135 0-1.18-.952-2.135-2.135-2.135z"
              transform="matrix(.30056 0 0 .30056 18.902 1.728)"
              fill="#fff"
              stroke="#fff"
            />
          </svg>
        ) : (
          <img className=" w-[27px]" src="./correct.png" alt="correct" />
        )}
      </label>
      {!isValid && (
        <div className="label">
          <span className="label-text-alt text-error">
            Username should have at least 5 characters
          </span>
        </div>
      )}
    </label>
  )
}

export default UsernameInput
