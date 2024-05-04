import React, { useState, useEffect } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const ActionBox = ({onClickEdit , onClickDelete}) => {
    
  
  return (
    <div className='flex gap-2 justify-center '>
      <button className='flex w-fit p-2 shadow-lg items-center text-sm gap-2 bg-white rounded-md border ' onClick={onClickDelete}>
        <MdOutlineDelete />
      </button>
    </div>
);
}

export default ActionBox