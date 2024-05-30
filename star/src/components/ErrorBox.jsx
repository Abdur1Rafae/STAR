import React from 'react'
import { MdClose } from 'react-icons/md'

const ErrorBox = ({heading, message,onCancel, sideNote}) => {
  return (
    <div className="z-20 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 font-body">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <button className='self-end' onClick={onCancel}><MdClose/></button>
            <h3 className='text-xl font-medium'>{heading}</h3>
            <p className="text-sm mb-4 mt-4">{message}</p>
            {
                sideNote &&
                <p className='text-xs text-gray-400 mt-4'>{sideNote}</p>
            }
        </div>
    </div>
  )
}

export default ErrorBox