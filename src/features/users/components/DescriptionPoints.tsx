import { format, parseISO } from 'date-fns'
import { SchemaUserResponseDto } from '../../../generated/schema'
import LocationIconSvg from '@/src/components/ui/icons/LocationIconSvg'
import LinkIconSvg from '@/src/components/ui/icons/LinkIconSvg'
import BornIconSvg from '@/src/components/ui/icons/BornIconSvg'
import CalendarIconSvg from '@/src/components/ui/icons/CalendarIconSvg'
import clsx from 'clsx'

interface Props {
  user: SchemaUserResponseDto
}

export const DescriptionPoints = ({
  user: { location, link, createdAt, bornDate, followersCount, followingCount },
}: Props) => {
  const allPointsExist = location && link && createdAt && bornDate

  return (
    <div className=" flex flex-col gap-5">
      <div
        className={` flex flex-wrap ${allPointsExist ? 'justify-between' : ' gap-2 sm:gap-4'} text-sm `}
      >
        {location && (
          <div className=" flex items-center gap-2">
            <LocationIconSvg width={20} height={20} fill="currentColor" />
            <p>{location}</p>
          </div>
        )}
        {link && (
          <div className=" flex items-center gap-2">
            <LinkIconSvg width={20} height={20} fill="currentColor" />
            <a
              target="_blank"
              rel="noreferrer"
              href={link}
              className=" link link-primary"
            >
              {link}
            </a>
          </div>
        )}
        {bornDate && (
          <div className=" flex items-center gap-2">
            <BornIconSvg width={20} height={20} fill="currentColor" />
            <p>Born {format(parseISO(bornDate), 'MMMM dd, yyyy')}</p>
          </div>
        )}
        {createdAt && (
          <div
            className={clsx(
              'flex items-center gap-2',
              allPointsExist && 'mt-2',
            )}
          >
            <CalendarIconSvg width={20} height={20} fill="currentColor" />
            <p>Joined {format(parseISO(createdAt), 'MMMM dd, yyyy')}</p>
          </div>
        )}
      </div>
      <div className=" flex gap-3 text-sm">
        <span>
          <span className=" text-secondary">{followingCount}</span> Following
        </span>
        <span>
          <span className=" text-secondary">{followersCount}</span> Followers
        </span>
      </div>
    </div>
  )
}
