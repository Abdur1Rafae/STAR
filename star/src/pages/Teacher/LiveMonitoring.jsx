import React, { useEffect, useState } from 'react';
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LMTable from '../../components/Teacher/LMTable'
import { FaRegCircleQuestion } from "react-icons/fa6";
import { BsCardChecklist } from "react-icons/bs";
import { RxClock } from "react-icons/rx";
import { StudentTicker, SubmissionTicker, ActiveTicker, FlagTicker } from '../../components/Tickers';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { MonitorAssessment } from '../../APIS/Teacher/AssessmentAPI';
import { DDMMMMYYYY_HHMM } from '../../Utils/DateFunctions';
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import Loader from '../../components/Loader';
import { LuRefreshCcwDot } from "react-icons/lu";


function LiveMonitoring() {
  const [loading, setLoading] = useState(true)
  const [assessment, setAssessment] = useState(JSON.parse(localStorage.getItem('MonitorAssessment')) || {})
  console.log(assessment)
  const [sections, setSections] = useState(assessment.participants.map((section) => section.name))
  const [stats, setStats] = useState([])
  const [totalCount, setTotalCount] = useState(assessment.totalStudents)
  const [submitCount, setSubmitCount] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [flaggedCount, setFlaggedCount] = useState(0)
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All')

  useEffect(()=> {
    const GetStats = async() => {
      try {
        const res = await MonitorAssessment({id: assessment._id})
        console.log(res)
        setTimeout(() => {
          setStats(res)
          setLoading(false);
        }, 1000);
      } catch(err) {
        console.log(err)
      }
    }

    GetStats()
  }, [])

  useEffect(() => {
    let totalCount = 0;
    let submitStudent = 0;
    let flaggedStudent = 0;
    let activeStudent = 0;

    stats.forEach((stat) => {
      const matchesSection = selectedSection === 'All' || stat.sectionName === selectedSection;

      if (matchesSection) {
        totalCount++;
        if (stat.status === "Submitted") {
            submitStudent++;
        } else if (stat.status === "Active") {
            activeStudent++;
            if (stat.flagged) {
                flaggedStudent++;
            }
        }
      }
    });

    setSubmitCount(submitStudent);
    setActiveCount(activeStudent);
    setFlaggedCount(flaggedStudent);
    setTotalCount(totalCount)
}, [stats, selectedSection]);

  const handleSelectSection = (category) => {
    setSelectedSection(category);
  }

  const handleSelectStatus = (category) => {
    setSelectedStatus(category);
  }

  const OpenDate = DDMMMMYYYY_HHMM({date: new Date(assessment.configurations.openDate)});

  const CloseDate = DDMMMMYYYY_HHMM({date: new Date(assessment.configurations.closeDate)});
  
  const columns = [
    { title: "Student", key: "studentName" },
    { title: "Section", key: "sectionName" },
    { title: "Start Time", key: "startTime" },
    { title: "Submit Time", key: "submitTime" },
    { title: "Status", key: "status" }
  ];

  const handleRefresh = async() => {
    setLoading(true)
    try {
      const res = await MonitorAssessment({id: assessment._id})
      console.log(res)
      setTimeout(() => {
        setStats(res)
        setLoading(false);
      }, 1000);
    } catch(err) {
      console.log(err)
    }
  }
  
  const status = ['Submitted', 'Active', 'Not Started'];
  return (
    <>
            <SideBar active={"Live Monitoring"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Live Monitoring"}/>
                <div className={`p-2 md:p-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
                  {
                    loading ?
                    <Loader/>
                    :
                    <>
                      <div className='bg-LightBlue shadow-md flex flex-col justify-around p-4' >
                        <div className='flex flex-col md:flex-row justify-between md:gap-0 gap-4'>
                          <div className='w-full flex flex-col gap-2'>
                              <div className='flex gap-4 items-center'>
                                <h2 className='font-bold text-xl'>{assessment.title}</h2>
                                <button onClick={handleRefresh} className='text-sm mt-1'><LuRefreshCcwDot/></button>
                              </div>
                              <p className='font-semibold text-xs md:text-sm text-gray-500'>{OpenDate} - {CloseDate}</p>
                              <div className='flex gap-4'>
                                  <div className="h-10 px-2 py-1 flex items-center text-gray-500 gap-2 bg-white text-xs font-medium border border-black">
                                      <RxClock className='text-lg'/><p>{assessment.configurations.duration} Mins</p>
                                  </div>
                                  <div className="text-gray-500 bg-white text-xs font-medium border h-10 gap-2 border-black flex items-center px-2 py-1">
                                      <FaRegCircleQuestion className='text-lg'/><p>{assessment.totalQuestions} Questions</p>
                                  </div>
                                  <div className="text-gray-500 bg-white text-xs font-medium border h-10 gap-2 border-black flex items-center px-2 py-1">
                                      <BsCardChecklist className='text-lg'/><p>{assessment.totalMarks} Marks</p>
                                  </div>
                              </div>
                          </div>
                          <FlipClockCountdown
                          className='self-center'
                              to={assessment.configurations.closeDate}
                              labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                              labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', color:'black' }}
                              digitBlockStyle={{ width: 20, height: 30, fontSize: 30, backgroundColor:'white', color:'#2C6491', fontWeight:700 }}
                              dividerStyle={{ color: 'white', height: 1 }}
                              separatorStyle={{ color: 'red', size: '6px' }}
                              duration={0.5}
                              />
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4'>
                          <StudentTicker value = {totalCount}/>
                          <SubmissionTicker value={submitCount}/>
                          <ActiveTicker value={activeCount}/>
                          <FlagTicker value={flaggedCount}/>
                        </div>
                      </div>
                      <div className="flex font-sans gap-4">
                        <div className="flex">
                          <p>Sections :&nbsp;</p>
                          <CategoryFilter categoryName="All" categories={sections} selectedCategory={selectedSection} onSelectCategory={handleSelectSection} assigning={true}/>
                        </div>
                        <div className="flex">
                          <p>Status :&nbsp;</p>
                          <CategoryFilter categoryName="All" categories={status} selectedCategory={selectedStatus} onSelectCategory={handleSelectStatus} assigning={true}/>
                        </div>
                      </div>
                      <LMTable data={stats} columns = {columns} selectedStatus= {selectedStatus} selectedSection= {selectedSection} />
                    </>
                  }
                  </div>
            </div>   
        </>
  );
}

export default LiveMonitoring;