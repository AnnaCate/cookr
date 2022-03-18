import React from 'react'

export function PageHeader(props: {
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <header className="w-full mb-4 -mt-1">
      <h1
        className={`font-sacramento w-full text-7xl ${
          props.center ? 'text-center' : 'text-left'
        }`}
      >
        {props.title}
      </h1>
      {props.subtitle && (
        <h2
          className={`w-full text-lg opacity-70 -mt-2 ${
            props.center ? 'text-center' : 'text-left'
          }`}
        >
          {props.subtitle}
        </h2>
      )}
    </header>
  )
}
