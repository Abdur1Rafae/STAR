import React from 'react'
import NewButton from '../button/NewButton'
import { MdOutlineViewSidebar } from "react-icons/md";
import { toggleNavTab } from '../../redux/teacherNav';
import { useDispatch } from 'react-redux';

const Subheader = ({name}) => {
    const dispatch = useDispatch()

    const handleNav = () => {
        dispatch(toggleNavTab())
    }
  return (
    <div className='h-14 w-full bg-LightBlue border-b-[1px] border-black flex p-4 items-center'>
        <button onClick={handleNav}><MdOutlineViewSidebar className='-rotate-90 md:hidden text-2xl mr-2'/></button>
        <p className='text-md md:text-xl font-body'>{name}</p>
    </div>
  )
}

export default Subheader