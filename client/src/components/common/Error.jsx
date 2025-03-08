import React from 'react'

const Error = ({ message = 'Something went wrong. Please try again.' }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-danger p-4 rounded-md">
      <p>{message}</p>
    </div>
  )
}

export default Error 