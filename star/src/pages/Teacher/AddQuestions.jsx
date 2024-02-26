import React from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'

const AddQuestions = () => {
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Schedule"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Add Questions"}/>
                <div className='p-4 md:pl-8 md:pt-8 flex flex-col gap-4 overflow-hidden'>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddQuestions