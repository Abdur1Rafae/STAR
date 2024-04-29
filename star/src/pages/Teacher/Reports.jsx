import React, {useEffect, useState} from 'react'
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

const Reports = () => {
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState('Overview')
    const reportId = localStorage.getItem('ReportId')

    useEffect(()=>{
        const GetOverview = async() => {
            try {
                const res = await GetReportsOverview({id:reportId});
                console.log(res)
                localStorage.setItem('ReportQuestionBank', JSON.stringify(res.questionBank))
                localStorage.setItem('ReportParticipants', JSON.stringify(res.participants))
                localStorage.setItem('TopicDistribution', JSON.stringify(res.topicBreakDown))
                localStorage.setItem('MostIncorrectQuestion', JSON.stringify(res.mostIncorrectQuestion))
                localStorage.setItem('ReportAsgMarks', res.totalMarks)
                setTimeout(() => {
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
                <div className={`p-2 md:p-4 flex overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
                    {
                        loading ? 
                        <Loader/>
                        :
                        <>
                            <div className='w-full bg-LightBlue flex md:flex-row flex-col p-2 items-center justify-between shadow-md'>
                            <div className='flex items-center self-start'>
                                <button onClick={()=>{window.location.assign('/teacher/reports')}}><BiChevronLeft className='text-3xl'/></button>
                                <h4 className='font-semibold'>Monthly Tes ergew iernf fieuwr int</h4>
                            </div>
                            <div className='flex items-center gap-2 sm:flex-row flex-col'>
                                <button onClick={()=>setTab("Overview")} className={`flex ${tab == "Overview" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                                    <GrOverview/>
                                    Overview
                                </button>
                                <button onClick={()=>setTab("Individual Performance")} className={`flex ${tab == "Individual Performance" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                                    <FaUsersViewfinder/>
                                    Individual Performance
                                </button>
                                <button onClick={()=>setTab("Questions Summary")} className={`flex ${tab == "Questions Summary" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                                    <MdQueryStats/>
                                    Questions Summary
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