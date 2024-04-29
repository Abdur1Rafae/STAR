import React from 'react'

const TextButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="h-8 bg-DarkBlue w-fit text-white font-semibold px-3 active:shadow-lg rounded focus:outline-none focus:shadow-outline flex items-center ml-auto"
    >  
      <p className=''>{label}</p>
    </button>
  )
}

export default TextButton