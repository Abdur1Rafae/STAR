import React from 'react'
import MenuBar from '../../components/MenuBar';
import AssignmentTable from '../../components/AssignmentTable';
import CourseCard from '../../components/CourseCard';
import SubHeader from '../../components/SubHeader';

const StudentCourses = () => {
    let term = "Spring 2024"
    return (
    <div className='flex flex-col mb-20'>
        <MenuBar/>
        <SubHeader isActive={"Courses"}/>
        <div className='pageContainer overflow-auto rounded-lg'>
            <h1 className='font-[300] mt-5 ml-4 font-body'>{term}</h1>
            <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
            <div className="flexContainer flex flex-wrap justify-start mb-4 ml-4">
                <div className='courseContainer w-10/12 flex flex-wrap gap-x-4 justify-start'>
                    <CourseCard Quiz_Count={3} Course_Title={"CSE 345 - Introduction to Computing"}/>
                    <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Supply Chain Management"}/>
                    <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Computer Communication and Networking"}/>
                </div>
            </div>
            <h1 className='font-[300] mt-5 ml-4 font-body'>{term}</h1>
            <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
            <div className="flexContainer flex flex-wrap justify-start mb-4 ml-4">
                <div className='courseContainer w-10/12 flex flex-wrap gap-x-4 justify-start'>
                    <CourseCard Quiz_Count={3} Course_Title={"CSE 345 - Introduction to Computing"}/>
                    <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Computer Communication and Networking"}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default StudentCourses