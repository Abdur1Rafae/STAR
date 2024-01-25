import React from 'react';
import MenuBar from '../../components/MenuBar';
import AssignmentTable from '../../components/AssignmentTable';
import SubHeader from '../../components/SubHeader';
import LiveQuiz from '../../components/LiveQuiz';

const StudentDashboard = () => {
    
    return (
        <div className='flex flex-col mb-20'>
            <MenuBar/>
            <SubHeader isActive={"Dashboard"}/>
            <div className='pageContainer'>
                <h1 className='font-[500] mt-5 ml-4 font-body'>Ongoing Assessments</h1>
                <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                <div className="QuizContainer  flex flex-wrap">
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
