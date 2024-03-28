import React, { useState } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import ClassTab from '../../components/Teacher/ClassTab'

const Classes = () => {
  const [classes, setClasses] = useState(["Technology Product Development", "Advanced Cloud Computing", "Information Security and Ethics"]) 

  const handleAddingClass = () => {
    let updatedClasses  = [...classes];
    updatedClasses.push("New Class");
    setClasses(updatedClasses);
  }

  const handleDeletingClass = (index) => {
    let updatedClasses = [...classes];
    updatedClasses.splice(index, 1);
    setClasses(updatedClasses);
  }

  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Classes"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Classes"} button={"New"} onClick={handleAddingClass}/>
                <div className='p-4 md:pl-8 md:pt-8 flex flex-col gap-4 overflow-auto'>
                  {
                    classes.map((classItem, index) => (
                      <ClassTab key={`${index} ${classItem}`} name={classItem} onDelete={()=>{handleDeletingClass(index)}} />
                    ))
                  }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Classes