import { createPortal } from 'react-dom'

export const BackgroundFreeze = ({ open }: { open: boolean }) => {
  if (!open) return null

  return createPortal(<div className="fixed inset-0 z-[9]" />, document.body)
}
