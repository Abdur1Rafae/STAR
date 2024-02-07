import React, { useState } from 'react'
import { MdEdit, MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import SectionTab from './SectionTab';
import AddSection from './AddSection';

const ClassTab = ({name}) => {
    const [display, setDisplay] = useState(false);
  return (
    <div className='w-full md:w-7/12 border-[1px] border-black p-2 overflow-hidden flex flex-col'>
        <div className='flex justify-between'>
            <div className='flex'>
                <input type='checkbox'></input>
                <h1 className='text-sm md:text-md ml-2 font-body text-DarkBlue font-medium'>{name}</h1>
                <button><MdEdit className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
            </div>
            <button onClick={()=>{setDisplay(!display)}}>
                {
                    display ?
                    <RiSubtractFill className='text-xl self-center'/>
                    :
                    <MdAdd className='text-xl self-center'/>
                }
            </button>
        </div>
        <div className={`transition-all ease-out duration-500 ${display ? '' : 'opacity-0 h-0'}`}>
            <SectionTab section={"5046(11:30AM - 12:45PM)"}/>
            <SectionTab section={"5046(11:30AM - 12:45PM)"}/>
            <SectionTab section={"5046(11:30AM - 12:45PM)"}/>
            <SectionTab section={"5046(11:30AM - 12:45PM)"}/>
            <AddSection/>
        </div>
    </div>
  )
}

export default ClassTab