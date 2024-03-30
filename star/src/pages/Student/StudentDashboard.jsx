import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/MenuBar';
import AssignmentTable from '../../components/Student/AssignmentTable';
import SubHeader from '../../components/Student/SubHeader';
import LiveQuiz from '../../components/Student/LiveQuiz';
import { GetOngoingAssessments, GetUpcomingAssessments } from '../../APIS/Student/AssessmentAPI';

const StudentDashboard = () => {
    const [LiveAssessments, SetLiveAssessments] = useState([])
    const [UpcomingAssessments, SetUpcomingAssessments] = useState([])

    useEffect(()=>{
        const GetLiveAssessments = (async()=>{
            try{
                const res = await GetOngoingAssessments()
                SetLiveAssessments(res)
            } catch(err) {
                console.log(err)
            }
        })

        const GetAssessments = (async()=>{
            try{
                const res = await GetUpcomingAssessments()
                SetUpcomingAssessments(res)
            } catch(err) {
                console.log(err)
            }
        })

        GetLiveAssessments()
        GetAssessments()
    }, [])
    
    return (
        <div className='flex flex-col mb-20'>
            <MenuBar name={"Maaz Shamim"} role={"Student"}/>
            <SubHeader isActive={"Dashboard"}/>
            <div className='pageContainer'>
                <h1 className='font-[500] mt-5 ml-4 font-body'>Ongoing Assessments</h1>
                <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                <div className="flex flex-wrap mx-4 gap-4 mt-4">
                    {
                        LiveAssessments.map((assessment)=>{
                            return(
                            <LiveQuiz QuizName={assessment.Title} duration={assessment.Duration} EndTime={assessment.CloseDate} ClassName={assessment.ClassName}/>
                        )})
                    }
                </div>
                <h1 className='font-[500] mt-5 ml-4 font-body'>Upcoming Assessments</h1>
                <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                {UpcomingAssessments.length > 0 ? (
                    <AssignmentTable assessments={UpcomingAssessments}/>
                ) : (
                    <p>No upcoming assessments.</p>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
