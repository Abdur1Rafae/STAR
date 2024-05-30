import React from 'react'
import SubmitButton from './button/SubmitButton'

const ConfirmationBox = ({heading, message, onConfirm, onCancel}) => {
  return (
    <div className="z-20 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 font-body">
        <div className="bg-white rounded-xl shadow-md p-6 md:max-w-80">
            <h3 className='text-xl font-medium'>{heading}</h3>
            <div className="text-sm mb-4 mt-4">{message}</div>
            <div className="flex justify-center gap-4">
                <SubmitButton label={"Cancel"} onClick={onCancel}/>
                <SubmitButton label={"Confirm"} active={true} onClick={onConfirm} />
            </div>
        </div>
    </div>
  )
}

export default ConfirmationBox