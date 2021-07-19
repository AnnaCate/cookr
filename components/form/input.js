import React from 'react'

export const Input = ({
  handleChange,
  id,
  label,
  name,
  placeholder = '',
  type = 'text',
  value,
}) => {
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
        required
        type={type}
        value={value}
      />
    </div>
  )
}
