import React, {useContext, useEffect, useState} from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronLeft } from 'react-icons/bi'
import { GrOverview } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";
import ReportsOverview from '../../components/Teacher/ReportsOverview'
import QuestionSummary from '../../components/Teacher/QuestionSummary'
import IndividualReport from '../../components/Teacher/IndividualReport'
import { GetReportsOverview } from '../../APIS/Teacher/ReportAPI'
import Loader from '../../components/Loader'
import { useParams } from 'react-router';
import { ReportContent } from '../../Context/ReportContext'

const Reports = () => {
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState('Overview')
    const reportId = localStorage.getItem('ReportId')
    const reportTitile = useParams()
    const {sections,setApiCallCompleted, setAllSecIncorrectQuestion, setAllSecTopicDistribution,   setSelectedSection, selectedSection, setAssessmentQuestions, setParticipants, setTopicDistribution, setInCorrectQuestion} = useContext(ReportContent)

    useEffect(()=>{
        const GetOverview = async() => {
            try {
                const res = await GetReportsOverview({id:reportId});
                setTimeout(() => {
                    console.log(res)
                    setAssessmentQuestions(res.questionBank)
                    //localStorage.setItem('ReportQuestionBank', JSON.stringify(res.questionBank))
                    setParticipants(res.participants)
                    //localStorage.setItem('ReportParticipants', JSON.stringify(res.participants))
                    setAllSecTopicDistribution(res.topicBreakDown)
                    //localStorage.setItem('TopicDistribution', JSON.stringify(res.topicBreakDown))
                    setAllSecIncorrectQuestion(res.mostIncorrectQuestion)
                    //localStorage.setItem('MostIncorrectQuestion', JSON.stringify(res.mostIncorrectQuestion))
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
    <div className='flex flex-col h-full font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
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
                                <div className='w-full flex justify-between items-center self-start'>
                                    <div className='flex items-center'>
                                        <button onClick={()=>{window.location.assign('/teacher/reports')}}><BiChevronLeft className='text-3xl'/></button>
                                        <h4 className='font-semibold'>{reportTitile.assessmentName}</h4>
                                    </div>
                                    <div className="text-sm flex justify-between items-center h-8 border-b-2 border-black">
                                        <div className="bg-LightBlue flex gap-2 items-center rounded-sm h-8">
                                            <h3>Section: </h3>
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
        </div>
    </div>
  )
}

export default Reports