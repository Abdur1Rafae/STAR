import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import SectionsDisplay from './SectionsDisplay';

const ClassTabDisplay = ({id, name, onDelete, classSections}) => {
    const [display, setDisplay] = useState(false);

    const [sections, setSections] = useState(classSections ? classSections: [])
    console.log(sections)


  return (
    <div className='w-full md:w-7/12 border-[1px] border-black p-2 overflow-hidden flex flex-col'>
        <div className='flex justify-between'>
            <div className='flex'>
                <h3 className='text-sm md:text-md ml-2 font-body text-DarkBlue'>{name}</h3>
            </div>
            <button onClick={()=>{setDisplay(!display)}}>
                <FaAngleDown className={`text-xl self-center transition-all duration-200 ease-in-out ${display ? 'rotate-180' : ''}`}/>
            </button>
        </div>
        <div className={`transition-all ease-out duration-500 ${display ? '' : 'opacity-0 pointer-events-none h-0'}`}>
            {
                sections.map((sectionItem, index)=> {
                    return <SectionsDisplay key={`${index} ${sectionItem._id}`} classID={id} sectionID={sectionItem._id} section={sectionItem.sectionName}/>
                })
            }
        </div>
    </div>
  )
}

export default ClassTabDisplay