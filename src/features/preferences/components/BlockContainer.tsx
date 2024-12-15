interface Props {
  children: React.ReactNode
}

export const BlockContainer = ({ children }: Props) => {
  return (
    <div className="rounded-lg border border-accent bg-base-100 py-4">
      {children}
    </div>
  )
}
