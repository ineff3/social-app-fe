import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export interface DropdownItem {
  title: string
  value: string
  Icon: (props: IconProps) => JSX.Element
  iconProps?: IconProps
  action: () => void
  dangerItem?: boolean
}
