import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAppSelector } from '@/src/redux/hooks'
import { selectUserPreview } from '@/src/redux/user/userSlice'
import { USERNAME_MAX_LENGTH } from './common/isUsernameValid'

const USERNAME_ARRAY_SIZE = 5

interface Props {
  setDebouncedUsername: Dispatch<SetStateAction<string>>
}

const GeneratedUsernames = ({ setDebouncedUsername }: Props) => {
  const [usernames, setUsernames] = useState<string[]>()
  const firstName = useAppSelector(selectUserPreview)!.firstName

  useEffect(() => {
    const generateUsernames = (firstName: string, arraySize: number) => {
      const arr = []
      const numberSequenceLength = USERNAME_MAX_LENGTH - firstName.length

      for (let i = 0; i < arraySize; i++) {
        let numberSequence = ''
        for (let j = 0; j < numberSequenceLength; j++) {
          numberSequence += String(Math.floor(Math.random() * 10))
        }
        arr.push(firstName + numberSequence)
      }
      return arr
    }
    const usernames = generateUsernames(firstName, USERNAME_ARRAY_SIZE)
    setUsernames(usernames)
  }, [firstName])

  if (!usernames) {
    return <></>
  }

  return (
    <div className=" flex flex-wrap gap-1 text-sm text-primary">
      {usernames.map((name, index) => (
        <span
          className=" cursor-pointer"
          onClick={() => setDebouncedUsername(name)}
          key={index}
        >
          @{name},
        </span>
      ))}
    </div>
  )
}

export default GeneratedUsernames
