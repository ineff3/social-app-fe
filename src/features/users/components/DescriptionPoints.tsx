import { format, parseISO } from 'date-fns'
import { SchemaUserResponseDto } from '../../../types/schema'
import LocationIconSvg from '@/src/components/ui/icons/LocationIconSvg'
import LinkIconSvg from '@/src/components/ui/icons/LinkIconSvg'
import BornIconSvg from '@/src/components/ui/icons/BornIconSvg'
import CalendarIconSvg from '@/src/components/ui/icons/CalendarIconSvg'

const DescriptionPoints = ({
  userData,
}: {
  userData: SchemaUserResponseDto
}) => {
  const allPointsExist =
    userData?.location &&
    userData?.link &&
    userData?.createdAt &&
    userData?.bornDate

  return (
    <div className=" flex flex-col gap-5">
      <div
        className={` flex flex-wrap ${allPointsExist ? 'justify-between' : ' gap-2 sm:gap-4'} text-sm `}
      >
        {userData?.location && (
          <div className=" flex items-center gap-2">
            <LocationIconSvg width={20} height={20} fill="currentColor" />
            <p>{userData.location}</p>
          </div>
        )}
        {userData?.link && (
          <div className=" flex items-center gap-2">
            <LinkIconSvg width={20} height={20} fill="currentColor" />
            <a
              target="_blank"
              rel="noreferrer"
              href={userData.link}
              className=" link link-primary"
            >
              {userData.link}
            </a>
          </div>
        )}
        {userData?.bornDate && (
          <div className=" flex items-center gap-2">
            <BornIconSvg width={20} height={20} fill="currentColor" />
            <p>Born {format(parseISO(userData?.bornDate), 'MMMM dd, yyyy')}</p>
          </div>
        )}
        {userData?.createdAt && (
          <div className=" mt-2 flex items-center gap-2">
            <CalendarIconSvg width={20} height={20} fill="currentColor" />
            <p>
              Joined {format(parseISO(userData?.createdAt), 'MMMM dd, yyyy')}
            </p>
          </div>
        )}
      </div>
      <div className=" flex gap-3 text-sm">
        <span>
          <span className=" text-secondary">{userData?.followingCount}</span>{' '}
          Following
        </span>
        <span>
          <span className=" text-secondary">{userData?.followersCount}</span>{' '}
          Followers
        </span>
      </div>
    </div>
  )
}

export default DescriptionPoints
