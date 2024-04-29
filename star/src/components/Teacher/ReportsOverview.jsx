import React, {useState, useContext} from 'react'
import { StudentDonutGraph } from './StudentDonut'
import { BiChevronDown } from 'react-icons/bi'
import CircularProgressBar from '../Student/course/CircularProgressBar'
import { BarChart } from './BarChart'
import { GaugeGraph } from './GuageChart'
import { TiGroup } from 'react-icons/ti'
import { FcQuestions } from 'react-icons/fc'
import { LuAlarmClock } from 'react-icons/lu'
import { PolarChart } from './PolarChart'
import { ReportContent } from '../../Context/ReportContext'

const ReportsOverview = () => {
    const {totalMarks, scoreDistribution, avgScore, highestScore, incorrectQuestion, topPerformers, absentees, requireAttention, avgResponseTime,topicDistribution, totalParticipants,  questionCount, selectedSection, sections, setSelectedSection} = useContext(ReportContent)
    const [extendPerformers, setExtendPerformers] = useState(true)
    const [extendAbsentees, setExtendAbsentees] = useState(false)
    const [extendRA, setExtendRA] = useState(false)
    const [selectSections, setSelectSections] = useState(false)
    const data = [{name: 'Top Performers', value: topPerformers.length},{name: 'Absentees', value: absentees.length},{name: 'Requires Attention', value: requireAttention.length}]

    const handleExtendPerformerSection = ()=>{
        setExtendPerformers(true)
        setExtendAbsentees(false)
        setExtendRA(false)
    }

    const handleExtendAbsenteesSection = ()=>{
        setExtendAbsentees(true)
        setExtendPerformers(false)
        setExtendRA(false)
    }

    const handleExtendRASection = ()=>{
        setExtendRA(true)
        setExtendAbsentees(false)
        setExtendPerformers(false)
    }
  return (
    <>
        <div className='md:flex w-full gap-2 lg:gap-4 hidden'>
            <div className='mt-4 w-1/2 flex flex-col gap-4'>
                <button onClick={()=>{setSelectSections((prev)=>!prev)}} className='bg-LightBlue border-[1px] border-black w-full h-10 px-4 text-slate-400'>
                    <div className='w-full flex items-center justify-between'>
                        <h4 className='font-medium text-sm'>Sections: </h4>
                        <p>{selectedSection}</p>
                        <BiChevronDown className='text-3xl'/>
                    </div>
                </button>
                {
                    selectSections &&
                    <div className='w-full min-h-24 max-h-36 bg-LightBlue overflow-y-auto'>
                        <button onClick={()=>{setSelectedSection("All"); setSelectSections(false)}} className='block p-2 text-lg font-body hover:bg-DarkBlue hover:text-white transition-all duration-150 ease-in-out w-full'>All</button>
                        {
                            sections.map((section)=>{
                                return <button onClick={()=>{setSelectedSection(section); setSelectSections(false)}} className='block p-2 text-lg font-body hover:bg-DarkBlue hover:text-white transition-all duration-150 ease-in-out w-full'>{section}</button>
                            })
                        }   
                    </div>
                }
                <div className='bg-LightBlue w-full flex lg:justify-between shadow-md pr-4 py-2'>
                    <AssessmentInfo avg={(avgScore/totalMarks * 100)} questionCount={questionCount} participants={totalParticipants} avgResponseTime={avgResponseTime}/>
                </div>
                <div className='bg-LightBlue w-full shadow-md p-2'>
                    <AvgHighestScore totalScore={totalMarks} avgScore={avgScore} highestScore={highestScore} data={scoreDistribution}/>
                </div>
                <div className='bg-LightBlue w-full shadow-md p-2 flex'>
                    <TopicUnderStanding inputData={topicDistribution}/>
                </div>
            </div>
            <div className='w-1/2'>
                <div className='w-full bg-LightBlue shadow-md mt-4 p-4'>
                    <StudentDonutGraph inputData={data}/>
                    <div className='max-h-64 overflow-y-auto flex gap-2'>
                        <button className='w-full my-auto' onClick={()=>{handleExtendPerformerSection()}}>
                            <p className='p-2 border-[1px] rounded-full border-[#47A3ED] font-semibold text-xs text-[#47A3ED]'>Top Performer</p>
                        </button>
                        <button className='w-full my-auto' onClick={()=>{handleExtendAbsenteesSection()}}>
                            <p className='p-2 border-[1px] rounded-full border-[#FF8100] font-semibold text-xs text-[#FF8100]'>Absentees</p>
                        </button>
                        <button className='w-full my-auto' onClick={()=>{handleExtendRASection()}}>
                            <p className='p-2 border-[1px] rounded-full border-[#E14942] font-semibold text-xs text-[#E14942]'>Requires Attention</p>
                        </button>
                    </div>
                    <div className={`${extendPerformers || extendAbsentees || extendRA ? 'max-h-48 overflow-y-auto no-scrollbar' : 'h-0 hidden'} space-y-2 mt-2 border-[1px] border-black p-2`}>
                        {
                            extendPerformers ? 
                            (
                                topPerformers.map((student) => {
                                    return (
                                        <div className='flex justify-between items-center border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>{student.name} - {student.erp}</p>
                                                <p className='text-xs'>Section: {student.section}</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>{student.score}%</h4>
                                        </div>
                                    )
                                })
                            )
                            :
                            extendAbsentees ?
                            (
                                absentees.map((student) => {
                                    return (
                                        <div className='flex justify-between items-center border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>{student.name} - {student.erp}</p>
                                                <p className='text-xs'>Section: {student.section}</p>
                                            </div>
                                            <h4 className='text-slate-400'>{student.score}%</h4>
                                        </div>
                                    )
                                })
                            )
                            :
                            (
                                requireAttention.map((student) => {
                                    return (
                                        <div className='flex justify-between items-center border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>{student.name} - {student.erp}</p>
                                                <p className='text-xs'>Section: {student.section}</p>
                                            </div>
                                            <h4 className='text-red-500'>{student.score}%</h4>
                                        </div>
                                    )
                                })
                            )
                        }
                        
                    </div>
                </div>
                <div className='w-full bg-LightBlue shadow-md mt-4 p-4'>
                    <IncorrectQuestion question={incorrectQuestion[0]}/>
                </div>
            </div>
        </div>
        <div className='flex flex-col w-full gap-4 md:hidden'>
            <div className='mt-4 w-full flex flex-col gap-4'>
                <button onClick={()=>{setSelectSections((prev)=>!prev)}} className='bg-LightBlue border-[1px] border-black w-full h-10 px-4 text-slate-400'>
                    <div className='w-full flex items-center justify-between'>
                        <h4 className='font-medium text-sm'>Sections: </h4>
                        <p>{selectedSection}</p>
                        <BiChevronDown className='text-3xl'/>
                    </div>
                </button>
                {
                    selectSections &&
                    <div className='w-full min-h-24 max-h-36 bg-LightBlue overflow-y-auto'>
                        <button onClick={()=>{setSelectedSection("All"); setSelectSections(false)}} className='block p-2 text-lg font-body hover:bg-DarkBlue hover:text-white transition-all duration-150 ease-in-out w-full'>All</button>
                        {
                            sections.map((section)=>{
                                return <button onClick={()=>{setSelectedSection(section); setSelectSections(false)}} className='block p-2 text-lg font-body hover:bg-DarkBlue hover:text-white transition-all duration-150 ease-in-out w-full'>{section}</button>
                            })
                        }   
                    </div>
                }
                <div className='bg-LightBlue w-full flex lg:justify-between shadow-md pr-4 py-2'>
                    <AssessmentInfo avg={(avgScore/totalMarks * 100)} questionCount={questionCount} participants={totalParticipants} avgResponseTime={avgResponseTime}/>
                </div>
                <div className='bg-LightBlue w-full shadow-md p-2'>
                    <AvgHighestScore totalScore={totalMarks} avgScore={avgScore} highestScore={highestScore} data={scoreDistribution}/>
                </div>
                <div className='w-full bg-LightBlue shadow-md p-4'>
                    <StudentDonutGraph inputData={data}/>
                    <div className='max-h-64 overflow-y-auto flex gap-2'>
                        <button className='w-full my-auto' onClick={()=>{handleExtendPerformerSection()}}>
                            <p className='p-2 border-[1px] rounded-full border-[#47A3ED] font-semibold text-xs text-[#47A3ED]'>Top Performer</p>
                        </button>
                        <button className='w-full my-auto' onClick={()=>{handleExtendAbsenteesSection()}}>
                            <p className='p-2 border-[1px] rounded-full border-[#FF8100] font-semibold text-xs text-[#FF8100]'>Absentees</p>
                        </button>
                        <button className='w-full my-auto' onClick={()=>{handleExtendRASection()}}>
                            <p className='p-2 border-[1px] rounded-full border-[#E14942] font-semibold text-xs text-[#E14942]'>Requires Attention</p>
                        </button>
                    </div>
                    <div className={`${extendPerformers ? 'max-h-48 overflow-y-auto' : 'h-0 hidden'} space-y-2`}>
                        <div className='flex justify-between items-center border-black'>
                            <div>
                                <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                <p className='text-xs'>Section: 4536</p>
                            </div>
                            <h4 className='text-[#3EAF3F]'>95%</h4>
                        </div>
                    </div>
                </div>
                <div className='bg-LightBlue w-full shadow-md p-2 flex'>
                    <TopicUnderStanding inputData={topicDistribution}/>
                </div>
                <div className='w-full bg-LightBlue shadow-md p-4'>
                    <IncorrectQuestion question={incorrectQuestion[0]}/>
                </div>
            </div>
        </div>
    </>
  )
}

const IncorrectQuestion = ({question}) => {
    return (
        <>
            <h4 className='text-sm font-medium'>Most Incorrect Question</h4>
            <div className='mt-4'>
                <p className='text-xs font-sans'>{question?.question}</p>
                <div className='flex'>
                    <div className='w-8/12 flex-grow'>
                        {
                            question?.type == 'MCQ' ?
                            (
                                question?.options?.map((option, index) => {
                                    return (
                                        <div key={index} className={`w-full border-[1px] min-h-8 rounded-md border-black ${question.correctOptions.includes(option) ? 'bg-green-200' : ''} p-2 mt-2 flex gap-2 items-center`}>
                                            <p className='text-sm font-sans'>{option}</p>
                                        </div> 
                                    )
                                })
                            )
                            :
                            question?.type == 'True/False' ? 
                            (
                                <>
                                    <div className={`w-full border-[1px] min-h-8 rounded-md border-black ${question.isTrue ? 'bg-green-200' : ''} p-2 mt-2 flex gap-2 items-center`}>
                                        <p className='text-sm font-sans'>True</p>
                                    </div>
                                    <div className={`w-full border-[1px] min-h-8 rounded-md border-black ${!question.isTrue ? 'bg-green-200' : ''} p-2 mt-2 flex gap-2 items-center`}>
                                        <p className='text-sm font-sans'>False</p>
                                    </div>  
                                </>
                            )
                            :
                            ''
                        }
                    </div>
                    <div className='w-3/12 flex items-center justify-center'>
                        <div className='w-24'>
                            <CircularProgressBar percentage={question?.percentage} width={7} flip={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AvgHighestScore = ({totalScore, avgScore, highestScore, data})=>{
    return (
        <>
            <div className='h-24 flex justify-between mt-2'>
                <h4 className='text-sm font-medium'>Score Distribution</h4>
                <div className='flex h-16 bg-lightBlue justify-around'>
                    <div className='w-28 h-28 rounded-lg flex flex-col'>
                        <h3 className='text-xs font-medium self-center'>Average Score</h3>
                        <div className='h-16 flex flex-col'>
                            <h3 className='text-2xl text-DarkBlue font-body font-semibold mt-2 self-center'>{avgScore}</h3>
                            <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalScore}</h3>
                        </div>
                    </div>
                    <div className='separator h-20 border-[1px] border-black self-center'></div>
                    <div className='w-28 h-16 rounded-lg flex flex-col'>
                        <h3 className='text-xs font-medium self-center'>Highest Score</h3>
                        <div className='h-16 flex flex-col'>
                            <h3 className='text-2xl text-DarkBlue font-body font-semibold mt-2 self-center'>{highestScore}</h3>
                            <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalScore}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <BarChart inputData={data}/>
        </>
    )
}

const AssessmentInfo = ({avg, participants, questionCount, avgResponseTime}) => {
    return (
        <>
            <div className='w-48 lg:ml-8'>
                <GaugeGraph percentage={avg}/>
                <div className='absolute flex flex-col items-center -mt-20 ml-16'>
                    <h4 className='text-3xl font-bold font-sans'>{avg}%</h4>
                    <p className='text-sm'>Average</p>
                </div>
            </div>
            <div className='w-full lg:w-48 lg:mr-12 my-auto font-medium text-xs flex flex-col gap-2'>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <TiGroup/>
                        <p>Participants</p>
                    </div>
                    <p>{participants}</p>
                </div>
                <hr className='border-b-2 border-black'></hr>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <FcQuestions/>
                        <p>Questions</p>
                    </div>
                    <p>{questionCount}</p>
                </div>
                <hr className='border-b-2 border-black'></hr>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <LuAlarmClock/>
                        <p>Avg. Time</p>
                    </div>
                    <p>{avgResponseTime}</p>
                </div>
            </div>
        </>
    )
}

const TopicUnderStanding =({inputData})=> {
    return (
        <div className='w-full h-full'>
            <h4 className='text-sm font-medium'>Topic Understanding</h4>
            <PolarChart inputData={inputData}/>
        </div>
    )
}

export default ReportsOverview