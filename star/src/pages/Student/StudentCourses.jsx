import React from 'react'
import MenuBar from '../../components/MenuBar';
import AssignmentTable from '../../components/AssignmentTable';
import CourseCard from '../../components/CourseCard';
import SubHeader from '../../components/SubHeader';

const StudentCourses = () => {
  return (
    <div className='flex flex-col mb-20'>
        <MenuBar/>
        <SubHeader isActive={"Courses"}/>
        <div className='pageContainer overflow-auto rounded-lg'>
            
        </div>
    </div>
  )
}

export default StudentCourses