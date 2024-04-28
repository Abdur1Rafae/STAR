import React, {useState} from 'react'
import { MdOutlineGroups, MdOutlineDeleteOutline } from "react-icons/md";
import { ClickOutsideFunc } from '../ClickOutsideFunc';
import { AddSection, UpdateSection } from '../../APIS/Teacher/SectionAPI';
import ConfirmationBox from '../ConfirmationBox';

const SectionTab = ({sectionID, classID, section, onDelete}) => {
    const [sectionName, setSectionName] = useState(section ?? "");
    const [newSection, setNewSection] = useState(section);
    const [isEditing, setIsEditing] = useState(section ? false : true);
    const [sectionId, setSectionId] = useState(sectionID)
    const [deleteSection, setDeleteSection] = useState(false)

    async function handleKeyPress(event) {
        if(newSection !== "") {
            if (event.key === 'Enter') {
                if(sectionName == "") {
                    try {
                        const res = await AddSection({classID: classID, name: newSection})
                        setSectionId(res.sectionId)
                    } catch(err) {
                        console.log(err)
                    }
                }
                else {
                    try {
                        const res = await UpdateSection({id:sectionId, name: newSection})
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
            <button className='flex flex-col justify-center items-center mr-4 hover:text-DarkBlue' onClick={()=> {localStorage.setItem("SelectedSection", sectionName); window.location.assign(`classes/${sectionId}`)}}>
                <MdOutlineGroups className='text-xl'/>
                <p className='text-xs font-body'>Roster</p>
            </button>
            <button className='flex flex-col justify-center items-center hover:text-red-600' onClick={()=>{setDeleteSection(true)}}>
                <MdOutlineDeleteOutline className='text-xl'/>
                <p className='text-xs font-body'>Delete</p>
            </button>
        </div>
        {
            deleteSection ? 
            <ConfirmationBox message={`Confirm to delete class: ${section}`} onConfirm={()=>onDelete(section.SectionID)} onCancel={()=>{setDeleteSection(false)}}/>
            : 
            ''
        }
    </div>
  )
}

export default SectionTab