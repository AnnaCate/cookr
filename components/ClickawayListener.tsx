import React from 'react'

export function ClickawayListener(props: {
  children: React.ReactNode
  setState: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const ref = React.createRef<HTMLDivElement>()
  const useClickAwayListener = (ref: React.RefObject<HTMLDivElement>) => {
    const handleClickAway = (event: MouseEvent | KeyboardEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        props.setState(false)
    }
    React.useEffect(() => {
      document.addEventListener('mousedown', handleClickAway)
      document.addEventListener('keydown', handleClickAway)
      return () => {
        document.removeEventListener('mousedown', handleClickAway)
        document.removeEventListener('keydown', handleClickAway)
      }
    })
  }
  useClickAwayListener(ref)

  return (
    <div className="h-full w-full" ref={ref}>
      {props.children}
    </div>
  )
}
