import React from 'react';
import MenuBar from '../../components/MenuBar';
import AssignmentTable from '../../components/Student/AssignmentTable';
import SubHeader from '../../components/Student/SubHeader';
import LiveQuiz from '../../components/Student/LiveQuiz';

const StudentDashboard = () => {
    
    return (
        <div className='flex flex-col mb-20'>
            <MenuBar name={"Maaz Shamim"} role={"Student"}/>
            <SubHeader isActive={"Dashboard"}/>
            <div className='pageContainer'>
                <h1 className='font-[500] mt-5 ml-4 font-body'>Ongoing Assessments</h1>
                <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                <div className="flex flex-wrap mx-4 gap-4 mt-4">
                    <LiveQuiz/>
                    <LiveQuiz/>
                    <LiveQuiz/>
                    <LiveQuiz/>
                </div>
                <h1 className='font-[500] mt-5 ml-4 font-body'>Upcoming Assessments</h1>
                <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                <AssignmentTable/>
            </div>
        </div>
    );
};

export default StudentDashboard;