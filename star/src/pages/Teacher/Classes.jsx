import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import ClassTab from '../../components/Teacher/ClassTab'
import { DeleteClass, GetAllClasses } from '../../APIS/Teacher/ClassAPI'
import SubmitButton from '../../components/button/SubmitButton'
import { AddClass } from '../../APIS/Teacher/ClassAPI'

const Classes = () => {
  const [classes, setClasses] = useState([]) 
  const [newClass, setNewClass] = useState('')
  const [isCreatingClass, setCreatingClass] = useState(false)

  const showDialogBox = () => {
    setCreatingClass(true)
  }

  const handleAddingClass = async () => {
    try {
      const res = await AddClass({ name: newClass });
      let updatedClasses = [...classes, { ClassID: res.classId, ClassName: newClass, Sections: null }];
      setClasses(updatedClasses);
      setNewClass('');
    } catch (err) {
      console.log(err);
    }
    setCreatingClass(false);
  };

  useEffect(()=> {
    const FetchClasses = async() => {
      try {
        const res = await GetAllClasses()
        setClasses(res.data)
      } catch(err) {
        console.log(err)
      }
    }

    FetchClasses()
  }, [])

  const handleDeletingClass = async(index, classID) => {
    try{
      const res = await DeleteClass({id: classID})
      let updatedClasses = [...classes];
      updatedClasses.splice(index, 1);
      setClasses(updatedClasses);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Classes"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Classes"} button={"New"} onClick={showDialogBox}/>
                <div className='p-4 md:pl-8 md:pt-8 flex flex-col gap-4 overflow-auto'>
                  {
                    classes.map((item, index) => (
                      <ClassTab key={`${index} ${item._id}`} id={item._id} name={item.className} classSections={item.sections} onDelete={()=>{handleDeletingClass(index, item._id)}} />
                    ))
                  }
                </div>
            </div>
            {
              isCreatingClass &&
              <div className='absolute top-32 right-4 w-52 h-32 bg-LightBlue border-[1px] border-black rounded-md p-2 flex flex-col justify-around items-center'>
                <h3 className='font-body'>Enter Class Name</h3>
                <input type='text' className='rounded-md h-8 px-2' onChange={(e)=> setNewClass(e.target.value)}></input>
                <SubmitButton active={true} label={"Create"} onClick={handleAddingClass}/>
              </div> 
            }
        </div>
    </div>
  )
}

export default Classes