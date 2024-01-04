import React from 'react';
import MenuBar from '../../components/MenuBar';
import AssignmentTable from '../../components/AssignmentTable';
import CourseCard from '../../components/CourseCard';

const StudentDashboard = () => {
    let error = false;
    

    return (
        <div className='flex flex-col'>
            <MenuBar/>
            <div className='pageContainer overflow-auto rounded-lg'>
                <h1 className='font-[700] mt-5 ml-4'>Upcoming Assignments</h1>
                <div className='border-b-2 border-grey ml-4 mr-4'></div>
                <AssignmentTable/>
                <h1 className='font-[700] mt-5 ml-4'>My Courses</h1>
                <div className='border-b-2 border-grey ml-4 mr-4'></div>
                <div className="flexContainer flex flex-wrap justify-center gap-x-2 mb-4">
                    <div className='courseContainer w-10/12 flex flex-wrap gap-x-2 justify-around'>
                        <CourseCard Quiz_Count={3} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={3} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={3} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={3} Course_Title={"CSE 345 - Introduction to Computing"}/>
                        <CourseCard Quiz_Count={1} Course_Title={"CSE 345 - Computer Communication and Networking"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
