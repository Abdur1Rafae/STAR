import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import SectionTab from './SectionTab';
import { FaCirclePlus } from "react-icons/fa6";
import { MdDeleteOutline } from 'react-icons/md';
import { LiaSaveSolid } from "react-icons/lia";
import { FaAngleDown } from "react-icons/fa";

const ClassTab = ({name, onDelete}) => {
    const [className, setClassName] = useState(name);
    const [newClass, setNewClass] = useState(name);
    const [display, setDisplay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [sections, setSections] = useState(["1234(11:30 - 12:45)", "6734(13:00 - 14:15)"])

    const handleAddingSection = () => {
        let updatedSections = [...sections]
        updatedSections.push("New Section")
        setSections(updatedSections)
    }

    const handleDeletingSection = (index) => {
        let updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
      }


  return (
    <div className='w-full md:w-7/12 border-[1px] border-black p-2 overflow-hidden flex flex-col'>
        <div className='flex justify-between'>
            <div className='flex'>
                {
                    isEditing ? 
                    (
                        <>                       
                            <input 
                                type='text' 
                                value={newClass} 
                                onChange={(e) => setNewClass(e.target.value)} 
                                className='text-sm md:text-md ml-2 font-body text-DarkBlue font-medium border-[1px] border-DarkBlue'
                            />
                            <button onClick={() => {
                                setClassName(newClass);
                                setIsEditing(false);
                            }}><LiaSaveSolid className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
                        </>

                    ) 
                    : 
                    (
                        <>
                            <h1 className='text-sm md:text-md ml-2 font-body text-DarkBlue font-medium'>{className}</h1>
                            <button onClick={() => setIsEditing(true)}><MdEdit className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
                        </>
                    )
                }
            </div>
            <button onClick={()=>{setDisplay(!display)}}>
                <FaAngleDown className={`text-xl self-center transition-all duration-200 ease-in-out ${display ? 'rotate-180' : ''}`}/>
            </button>
        </div>
        <div className={`transition-all ease-out duration-500 ${display ? '' : 'opacity-0 pointer-events-none h-0'}`}>
            <div className='flex gap-2'>
                <AddSection onClick={handleAddingSection}/>
                <DeleteClass onClick={onDelete}/>
            </div>
            {
                sections.map((sectionItem, index)=> {
                    return <SectionTab key={`${index} ${sectionItem}`} section={sectionItem} onDelete={()=>handleDeletingSection(index)}/>
                })
            }
        </div>
    </div>
  )
}

const AddSection = ({onClick}) => {
    return (
        <button onClick={onClick} className='mt-2 w-full h-12 border-[1px] border-dashed border-DarkBlue text-DarkBlue p-2 flex items-center'>
            <div className='flex items-center'>
                <FaCirclePlus className='ml-4'/>
                <p className='ml-2'>Add Section</p>
            </div>
        </button>
    )
}
const DeleteClass = ({onClick}) => {
    return (
        <button onClick={onClick} className='mt-2 w-full h-12 border-[1px] border-dashed border-red-600 text-red-600 p-2 flex items-center'>
            <div className='flex items-center'>
                <MdDeleteOutline className='ml-4'/>
                <p className='ml-2'>Delete Class</p>
            </div>
        </button>
    )
}

export default ClassTab