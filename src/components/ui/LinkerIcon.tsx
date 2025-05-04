interface  Props {
  width?: number
}

export const LinkerIcon = ({width = 30}: Props) => {
  return (
    <img src="/linker-icon.png" alt="Linker Icon" style={{width}} />
  )
}
