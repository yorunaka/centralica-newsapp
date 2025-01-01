import React from 'react'
import { useLocation, useNavigate } from 'react-router'

const ErrorPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const error = location.state?.error || 'unknown error'
  return (
    <div>    
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-500">Oops! Something went wrong.</h1>
          <p className="mt-4 text-lg text-gray-700">{error}</p>
        <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  )
}

export default ErrorPage