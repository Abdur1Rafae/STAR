import React from 'react'
import NewButton from '../button/NewButton'
import { MdOutlineViewSidebar } from "react-icons/md";
import { ToggleStore } from '../../Stores/ToggleStore';

const SubheaderBut = ({name, button, onClick}) => {
    const toggleSidebar = ToggleStore((store) => store.toggleSidebar)

    const handleNav = () => {
      toggleSidebar()
    }
  return (
    <div className='h-14 w-full bg-LightBlue border-b-[1px] border-black flex p-4 items-center'>
        <button onClick={handleNav}><MdOutlineViewSidebar className='-rotate-90 md:hidden text-2xl mr-2'/></button>
        <p className='text-md md:text-xl font-body'>{name}</p>
        <NewButton label={button} onClick={onClick}/>
    </div>
  )
}

export default SubheaderBut