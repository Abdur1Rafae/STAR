import React, {useState} from 'react'
import { MdOutlineGroups, MdOutlineDeleteOutline } from "react-icons/md";
import { ClickOutsideFunc } from '../ClickOutsideFunc';
import { AddSection, UpdateSection } from '../../APIS/Teacher/SectionAPI';

const SectionTab = ({classID, section, onDelete}) => {
    const [sectionName, setSectionName] = useState(section.SectionName ?? "");
    const [newSection, setNewSection] = useState(section.SectionName);
    const [isEditing, setIsEditing] = useState(section.SectionName ? false : true);

    async function handleKeyPress(event) {
        if(newSection !== "") {
            if (event.key === 'Enter') {
                if(sectionName == "") {
                    try {
                        const res = await AddSection({classID: classID, name: newSection})
                        section.SectionID = res.sectionId
                        console.log(res) 
                    } catch(err) {
                        console.log(err)
                    }
                }
                else {
                    try {
                        const res = await UpdateSection({id:section.SectionID, name: newSection})
                        console.log(res) 
                    } catch(err) {
                        console.log(err)
                    }
                }
                setSectionName(newSection);
                setIsEditing(false);
            }
        }
    }

    let saveSectionName = ClickOutsideFunc(()=>{
        setIsEditing(false);
    })

  return (
    <div className='w-full h-12 border-[1px] border-black p-2 bg-LightBlue flex justify-between mt-2'>
        <div className='flex items-center'>
            <div ref={saveSectionName} className='flex'>
                {
                    isEditing ? 
                    (
                        <>                       
                            <input 
                                autoFocus
                                placeholder='Section'
                                type='text' 
                                value={newSection} 
                                onChange={(e) => setNewSection(e.target.value)} 
                                className='text-sm md:text-md ml-2 bg-LightBlue border-none outline-none'
                                onKeyDown={handleKeyPress}
                            />
                        </>

                    ) 
                    : 
                    (
                        <>
                            <button onClick={() => setIsEditing(true)}><h1 className='text-sm md:text-md ml-2 font-body text-DarkBlue hover:underline'>{sectionName}</h1></button>
                        </>
                    )
                }
            </div>
        </div>
        <div className='flex'>
            <button className='flex flex-col justify-center items-center mr-4 hover:text-DarkBlue'>
                <MdOutlineGroups className='text-xl'/>
                <p className='text-xs font-body'>Roster</p>
            </button>
            <button className='flex flex-col justify-center items-center hover:text-red-600' onClick={()=>onDelete(section.SectionID)}>
                <MdOutlineDeleteOutline className='text-xl'/>
                <p className='text-xs font-body'>Delete</p>
            </button>
        </div>
    </div>
  )
}

export default SectionTab