import React, {useContext, useEffect, useState} from 'react'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronLeft } from 'react-icons/bi'
import { GrOverview } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";
import ReportsOverview from '../../components/Teacher/ReportsOverview'
import { GetReportsOverview } from '../../APIS/Teacher/ReportAPI'
import Loader from '../../components/Loader'
import { useParams } from 'react-router';
import { ReportContent } from '../../Context/ReportContext'
import QuestionSummary from '../../components/Teacher/QuestionSummary'
import IndividualReport from '../../components/Teacher/IndividualReport'

const Reports = () => {
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState('Overview')
    const reportId = sessionStorage.getItem('ReportId')
    const reportTitile = useParams()
    const {sections,setApiCallCompleted, setAllSecIncorrectQuestion, setAllSecTopicDistribution,   setSelectedSection, selectedSection, setAssessmentQuestions, setParticipants, setTopicDistribution, setInCorrectQuestion} = useContext(ReportContent)

    useEffect(()=>{
        const GetOverview = async() => {
            try {
                const res = await GetReportsOverview({id:reportId});
                setTimeout(() => {
                    console.log(res)
                    setAssessmentQuestions(res.questionBank)
                    setParticipants(res.participants)
                    setAllSecTopicDistribution(res.topicBreakDown)
                    setAllSecIncorrectQuestion(res.mostIncorrectQuestion)
                    localStorage.setItem('ReportAsgMarks', res.totalMarks ?? 0)
                    setApiCallCompleted(true)
                    setLoading(false)
                }, 1000);
            } catch(err) {
                console.log(err)
            }
        }

        GetOverview()
    }, [])
    

  return (
    <>
            <SideBar active={"Reports"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Reports"}/>
                <div className={`p-2 flex overflow-hidden ${loading ? 'h-screen flex-row justify-center items-center' : 'flex-col'}`}>
                    {
                        loading ? 
                        <Loader/>
                        :
                        <>
                            <div className='w-full bg-LightBlue flex flex-col p-2 items-center justify-between shadow-md'>
                                <div className='w-full flex justify-between items-center flex-wrap gap-2 self-start'>
                                    <div className='flex items-center'>
                                        <button onClick={()=>{window.location.assign('/teacher/reports')}}><BiChevronLeft className='text-3xl'/></button>
                                        <h4 className='font-semibold'>{reportTitile.assessmentName}</h4>
                                    </div>
                                    <div className="text-sm self-end flex justify-between items-center h-8 border-b-2 border-black">
                                        <div className="bg-LightBlue flex gap-2 items-center rounded-sm h-8">
                                            <select
                                                value={selectedSection}
                                                onChange={(e) => setSelectedSection(e.target.value)}
                                                className='outline-none bg-LightBlue rounded-md h-7'
                                            >
                                                <option value={"All"}>
                                                    All
                                                </option>
                                                {sections.map((category, index) => (
                                                    <option key={index} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                                
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-around items-center mt-2'>
                                    <button onClick={()=>setTab("Overview")} className={`flex ${tab == "Overview" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                                        <GrOverview/>
                                        <p>Overview</p>
                                    </button>
                                    <button onClick={()=>setTab("Individual Performance")} className={`flex ${tab == "Individual Performance" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                                        <FaUsersViewfinder/>
                                        <p>Individuals</p>
                                    </button>
                                    <button onClick={()=>setTab("Questions Summary")} className={`flex ${tab == "Questions Summary" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                                        <MdQueryStats/>
                                        <p>Questions</p>
                                    </button>
                                </div>
                            </div>
                            {
                                tab == "Overview" ?
                                <ReportsOverview/>
                                :
                                tab == "Individual Performance" ?
                                <IndividualReport/>
                                :
                                <QuestionSummary/>
                            }
                        </>
                    }
                </div>
            </div>
        </>
  )
}

export default Reports