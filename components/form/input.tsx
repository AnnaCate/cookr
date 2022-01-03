import React from 'react'

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label: string
  name: string
  placeholder?: string
  type?: string
  value: string
}

export const Input = ({
  handleChange,
  id,
  label,
  name,
  placeholder = '',
  type = 'text',
  value,
}: Props) => {
  return (
    <div className="c-input-wrapper">
      <label className="c-input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="c-input"
        id={id}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  )
}
