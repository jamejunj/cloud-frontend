import React from 'react'
import { Link } from 'react-router-dom'

function Error({code=404, message="Page not found"}) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl">{code}</h1>
      <hr />
      <p>{message}</p>
      <Link className="text-blue-500 hover:underline hover:text-blue-700"to="/">Back to home page</Link>
    </div>
  )
}

export default Error