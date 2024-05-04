import React from 'react'
import SubmitButton from './button/SubmitButton'

const ConfirmationBox = ({message, onConfirm, onCancel}) => {
  return (
    <div className="z-20 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white rounded-md shadow-md p-6">
            <p className="text-lg mb-4">{message}</p>
            <div className="flex justify-between">
                <SubmitButton label={"Cancel"} onClick={onCancel}></SubmitButton>
                <SubmitButton label={"Confirm"} active={true} onClick={onConfirm} />
            </div>
        </div>
    </div>
  )
}

export default ConfirmationBox