import React, {useState} from 'react'
import { MdEdit, MdOutlineGroups, MdOutlineDeleteOutline } from "react-icons/md";
import { LiaSaveSolid } from "react-icons/lia";

const SectionTab = ({section, onDelete}) => {
    const [sectionName, setSectionName] = useState(section);
    const [newSection, setNewSection] = useState(section);
    const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='w-full h-12 border-[1px] border-black p-2 bg-LightBlue flex justify-between mt-2'>
        <div className='flex items-center'>
        {
            isEditing ? 
            (
                <>                       
                    <input 
                        type='text' 
                        value={newSection} 
                        onChange={(e) => setNewSection(e.target.value)} 
                        className='text-sm md:text-md ml-2 border-[1px] border-DarkBlue'
                    />
                    <button onClick={() => {
                        setSectionName(newSection);
                        setIsEditing(false);
                    }}><LiaSaveSolid className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
                </>

            ) 
            : 
            (
                <>
                    <h1 className='text-sm md:text-md ml-2 underline'>{sectionName}</h1>
                    <button onClick={() => setIsEditing(true)}><MdEdit className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
                </>
            )
        }
        </div>
        <div className='flex'>
            <button className='flex flex-col justify-center items-center mr-4 hover:text-DarkBlue'>
                <MdOutlineGroups className='text-xl'/>
                <p className='text-xs font-body'>Roster</p>
            </button>
            <button className='flex flex-col justify-center items-center hover:text-red-600' onClick={onDelete}>
                <MdOutlineDeleteOutline className='text-xl'/>
                <p className='text-xs font-body'>Delete</p>
            </button>
        </div>
    </div>
  )
}

export default SectionTab