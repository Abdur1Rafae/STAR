import React from 'react'
import { MdOutlineViewSidebar } from "react-icons/md";
import { ToggleStore } from '../../Stores/ToggleStore';

const Subheader = ({name}) => {
    const toggleSidebar = ToggleStore((store)=> store.toggleSidebar)

    const handleNav = () => {
      toggleSidebar()
    }
  return (
    <div className='h-14 w-auto bg-LightBlue border-b-[1px] border-black flex p-4 items-center'>
        <button onClick={handleNav}><MdOutlineViewSidebar className='-rotate-90 md:hidden text-2xl mr-2'/></button>
        <p className='text-md md:text-xl font-body'>{name}</p>
    </div>
  )
}

export default Subheader