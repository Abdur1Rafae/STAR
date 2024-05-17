import React from 'react'
import MenuBar from '../components/MenuBar'
import { Outlet } from 'react-router-dom'

const Teacher = () => {
  return (
    <div className='flex flex-col h-full'>
        <MenuBar/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Teacher