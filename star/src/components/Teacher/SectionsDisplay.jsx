import React, {useContext} from 'react'
import { SectionContext } from '../../Context/SectionsContext'

const SectionsDisplay = ({classID, sectionID, section}) => {
    const {selectedSections, toggleSection} = useContext(SectionContext)
    const currSection = {
        _id: sectionID,
        name: section,
        class: classID
    }
  return (
    <button onClick={()=>toggleSection(currSection)} className='w-full h-12 border-[1px] border-black p-2 bg-LightBlue flex justify-between mt-2'>
        <div className='flex h-full items-center'>
            <input type='checkbox' checked={selectedSections.some(item => item._id === sectionID)} />
            <div className='flex'>
                <h3 className='text-sm md:text-md ml-2 font-body text-DarkBlue'>{section}</h3>
            </div>
        </div>
    </button>
  )
}

export default SectionsDisplay