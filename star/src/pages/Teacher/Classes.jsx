import React from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import ClassTab from '../../components/Teacher/ClassTab'

const Classes = () => {
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Classes"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Classes"} button={"New"}/>
                <div className='p-4 md:pl-8 md:pt-8 flex flex-col gap-4 overflow-auto'>
                    <ClassTab name={"Technology Product Development"}/>
                    <ClassTab name={"Technology Product Development"}/>
                    <ClassTab name={"Technology Product Development"}/>
                    <ClassTab name={"Technology Product Development"}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Classes