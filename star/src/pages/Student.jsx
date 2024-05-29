import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuBar from '../components/MenuBar';

const Student = () => {
  return (
    <div className='flex flex-col mb-20 font-body'>
        <MenuBar/>
        <Outlet/>
    </div>
  )
}

export default Student