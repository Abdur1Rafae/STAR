import React from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'

const TeacherDashboard = () => {
  return (
    <div className='flex flex-col h-screen'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar/>
            <div className='w-full'>
                <SubheaderBut name={"Scheduled Assessments"} button={"New"}/>

            </div>
        </div>
    </div>
  )
}

export default TeacherDashboard