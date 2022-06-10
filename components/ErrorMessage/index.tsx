import React from 'react'
export interface ErrorProps {
  message: string
}

export const ErrorMessage = (props: ErrorProps) => {
  const { message } = props
  return (
    <div className="text-red-error mx-2 flex items-center py-2">
      <p className="text-left text-sm leading-snug">{message}</p>
    </div>
  )
}
