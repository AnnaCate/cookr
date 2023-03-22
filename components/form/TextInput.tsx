import React from 'react'

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label: string
  name: string
  required?: boolean
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
  required = false,
  type = 'text',
  value,
}: Props) => {
  return (
    <div className="c-input-wrapper">
      <label className="c-input-label" htmlFor={name}>
        {label}
        {required && <span className="text-red-600 font-normal">*</span>}
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
