import React, { useEffect, useState, lazy } from 'react';
import { GetOngoingAssessments, GetUpcomingAssessments } from '../../APIS/Student/AssessmentAPI';
import Loader from '../../components/Loader';
import SubHeader from '../../components/Student/SubHeader';
const AssignmentTable = lazy(() => import('../../components/Student/AssignmentTable')) 
const LiveQuiz = lazy(()=> import('../../components/Student/LiveQuiz'))

const StudentDashboard = () => {
    const [LiveAssessments, SetLiveAssessments] = useState([])
    const [UpcomingAssessments, SetUpcomingAssessments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const GetLiveAssessments = (async()=>{
            try{
                const res = await GetOngoingAssessments()
                console.log(res)
                SetLiveAssessments(res)
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch(err) {
                console.log(err)
            }
        })

        const GetAssessments = (async()=>{
            try{
                const res = await GetUpcomingAssessments()
                console.log(res)
                SetUpcomingAssessments(res)
            } catch(err) {
                console.log(err)
            }
        })

        GetLiveAssessments()
        GetAssessments()
    }, [])
    
    return (
        <>
            <SubHeader isActive={"Dashboard"}/>
            <div className={`${loading ? 'flex h-96 flex-row justify-center items-center' : ''}`}>
                {
                    loading ?
                    <Loader/> :
                    <>
                        <h1 className='font-[500] mt-5 ml-4 font-body'>Ongoing Assessments</h1>
                        <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                        <div className="flex flex-wrap mx-4 gap-4 mt-4">
                        {
                            LiveAssessments.length > 0 ?
                            (
                                LiveAssessments.map((assessment, index)=>{
                                    return(
                                    <LiveQuiz key={index} assessment={assessment}/>
                                )})
                            )
                            :
                            <p className=''>No ongoing assessments</p>
                        }
                        
                        </div>
                        <h1 className='font-[500] mt-5 ml-4 font-body'>Upcoming Assessments</h1>
                        <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                        {UpcomingAssessments.length > 0 ? (
                            <AssignmentTable assessments={UpcomingAssessments}/>
                        ) : (
                            <p className='ml-4 mt-4'>No upcoming assessments.</p>
                        )}
                    </>
                }
            </div>
        </>
    );
};

export default StudentDashboard;
