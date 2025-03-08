import React from 'react'

const FormInput = ({ 
  label, 
  type = 'text', 
  id,
  name,
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  disabled = false,
  error = '',
}) => {
  const inputName = name || id
  const inputId = id || name

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        id={inputId}
        name={inputName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary 
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${error ? 'border-danger ring-1 ring-danger' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-danger text-sm">{error}</p>}
    </div>
  )
}

export default FormInput 