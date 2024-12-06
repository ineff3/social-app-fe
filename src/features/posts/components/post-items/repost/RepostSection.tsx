import { DropdownMenu } from '@/src/components/ui/dropdown-menu/DropdownMenu'
import RepostIconSvg from '@/src/components/ui/icons/RepostIconSvg'

import { DropdownItem } from '@/src/types'
import { RepostButton } from './RepostButton'
import { FaRegPenToSquare } from 'react-icons/fa6'

interface Props {
  repostsCount: number
}

export const RepostSection = ({ repostsCount }: Props) => {
  const handleRepost = () => {}
  const handleQuote = () => {}

  const items: DropdownItem[] = [
    {
      title: 'Repost',
      value: 'repost',
      Icon: RepostIconSvg,
      iconProps: {
        width: 22,
        height: 22,
        fill: 'currentColor',
      },
      action: handleRepost,
    },
    {
      title: 'Quote',
      value: 'quote',
      Icon: FaRegPenToSquare,
      iconProps: {
        width: 22,
        height: 22,
      },
      action: handleQuote,
    },
  ]
  // FaRegPenToSquare
  return (
    <>
      <div data-tip="Repost" className=" tooltip tooltip-secondary">
        <DropdownMenu
          items={items}
          anchor="bottom start"
          width="fit-content"
          OpenButton={RepostButton}
        />
      </div>
      <p>{repostsCount}</p>
    </>
  )
}
