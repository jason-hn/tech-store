import React from 'react'

const FormInput = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  error, 
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'border-danger focus:border-danger focus:ring-danger' : ''}`}
        required={required}
      />
      {error && <p className="mt-1 text-danger text-sm">{error}</p>}
    </div>
  )
}

export default FormInput 