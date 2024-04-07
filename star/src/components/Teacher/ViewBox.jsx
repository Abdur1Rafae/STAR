import React, { useState, useEffect } from 'react'
import { IoEyeOutline } from "react-icons/io5";

const ViewBox = ({onClick}) => {
    
  
  return (
   <button className='flex w-fit p-2 shadow-lg flex items-center text-sm gap-2 bg-white rounded-md border ' onClick={onClick}>
    <IoEyeOutline/> 
    <span>View</span>
   </button>
);
}

export default ViewBox