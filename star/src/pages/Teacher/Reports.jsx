import React, {useState} from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronDown, BiChevronLeft } from 'react-icons/bi'
import { GrOverview } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";
import { GaugeGraph } from '../../components/Teacher/GuageChart'
import { TiGroup } from "react-icons/ti";
import { FcQuestions } from "react-icons/fc";
import { LuAlarmClock } from "react-icons/lu";
import { BarChart } from '../../components/Teacher/BarChart'
import { StudentDonutGraph } from '../../components/Teacher/StudentDonut'
import { PolarChart } from '../../components/Teacher/PolarChart'
import CircularProgressBar from '../../components/Student/course/CircularProgressBar'

const Reports = () => {
    const [extendPerformers, setExtendPerformers] = useState(true)
    const [extendAbsentees, setExtendAbsentees] = useState(false)
    const [extendRA, setExtendRA] = useState(false)

    const data = [{name: 'Top Performers', value: 17},{name: 'Absentees', value: 6},{name: 'Requires Attention', value: 12}]

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
    <div className='flex flex-col h-full font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Reports"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Reports"}/>
                <div className='w-auto h-full lg:p-4 md:p-2'>
                    <div className='w-full bg-LightBlue flex md:flex-row flex-col p-2 items-center justify-between shadow-md'>
                        <div className='flex items-center self-start'>
                            <BiChevronLeft className='text-3xl'/>
                            <h4 className='font-semibold'>Monthly Test</h4>
                        </div>
                        <div className='flex items-center gap-2 sm:flex-row flex-col'>
                            <button className='flex bg-DarkBlue text-white active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md'>
                                <GrOverview/>
                                Overview
                            </button>
                            <button className='flex active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md'>
                                <FaUsersViewfinder/>
                                Individual Performance
                            </button>
                            <button className='flex active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md'>
                                <MdQueryStats/>
                                Questions Summary
                            </button>
                        </div>
                    </div>
                    <div className='md:flex w-full gap-4 hidden'>
                        <div className='mt-4 w-1/2 flex flex-col gap-4'>
                            <div className='bg-LightBlue w-full flex lg:justify-between shadow-md pr-4 py-2'>
                                <AssessmentInfo/>
                            </div>
                            <div className='bg-LightBlue w-full shadow-md p-2'>
                                <AvgHighestScore/>
                            </div>
                            <div className='bg-LightBlue w-full shadow-md p-2 flex'>
                                <TopicUnderStanding/>
                            </div>
                        </div>
                        <div className='w-1/2 mt-4'>
                            
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
                                <div className={`${extendPerformers ? 'max-h-48 overflow-y-auto' : 'h-0 hidden'} space-y-2`}>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>95%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>93%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>86%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>95%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>93%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>86%</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full bg-LightBlue shadow-md mt-4 p-4'>
                                <IncorrectQuestion/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4 md:hidden'>
                        <div className='mt-4 w-full flex flex-col gap-4'>
                            <button className='bg-LightBlue border-[1px] border-black w-full h-10 px-4 text-slate-400'>
                                <div className='w-full flex items-center justify-between'>
                                    <h4 className='font-medium text-sm'>Sections: </h4>
                                    <p></p>
                                    <BiChevronDown className='text-3xl'/>
                                </div>
                            </button>
                            <div className='bg-LightBlue w-full flex lg:justify-between shadow-md pr-4 py-2'>
                                <AssessmentInfo/>
                            </div>
                            <div className='bg-LightBlue w-full shadow-md p-2'>
                                <AvgHighestScore/>
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
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>93%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>86%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>95%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>93%</h4>
                                    </div>
                                    <div className='flex justify-between items-center border-black'>
                                        <div>
                                            <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                            <p className='text-xs'>Section: 4536</p>
                                        </div>
                                        <h4 className='text-[#3EAF3F]'>86%</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-LightBlue w-full shadow-md p-2 flex'>
                                <TopicUnderStanding/>
                            </div>
                            <div className='w-full bg-LightBlue shadow-md p-4'>
                                <IncorrectQuestion/>
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const IncorrectQuestion = () => {
    return (
        <>
            <h4 className='text-sm font-medium'>Most Incorrect Question</h4>
            <div className='mt-4'>
                <p className='text-xs font-sans'>Which among the following period is known as the era of second generation computer?</p>
                <div className='flex'>
                    <div className='w-8/12 flex-grow'>
                        <div className='w-full border-[1px] min-h-8 rounded-md border-black p-2 mt-2 flex gap-2 items-center'>
                            <div className='rounded-full border-black border-[1px] px-2'>A</div>
                            <p className='text-sm font-sans'>1951 - 1959</p>
                        </div> 
                        <div className='w-full border-[1px] min-h-8 rounded-md border-black p-2 mt-2 flex gap-2 items-center'>
                            <div className='rounded-full border-black border-[1px] px-2'>A</div>
                            <p className='text-sm font-sans'>1951 - 1959</p>
                        </div> 
                        <div className='w-full border-[1px] min-h-8 rounded-md border-black p-2 mt-2 flex gap-2 items-center'>
                            <div className='rounded-full border-black border-[1px] px-2'>A</div>
                            <p className='text-sm font-sans'>1951 - 1959</p>
                        </div> 
                        <div className='w-full border-[1px] min-h-8 rounded-md border-black p-2 mt-2 flex gap-2 items-center bg-green-200'>
                            <div className='rounded-full border-black border-[1px] px-2'>A</div>
                            <p className='text-sm font-sans'>1951 - 1959</p>
                        </div> 
                    </div>
                    <div className='w-3/12 flex items-center justify-center'>
                        <div className='w-24'>
                            <CircularProgressBar percentage={86} width={7}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AvgHighestScore = ()=>{
    return (
        <>
            <div className='h-24 flex justify-between mt-2'>
                <h4 className='text-sm font-medium'>Score Distribution</h4>
                <div className='flex h-16 bg-lightBlue justify-around'>
                    <div className='w-28 h-28 rounded-lg flex flex-col'>
                        <h3 className='text-xs font-medium self-center'>Average Score</h3>
                        <div className='h-16 flex flex-col'>
                            <h3 className='text-2xl text-DarkBlue font-body font-semibold mt-2 self-center'>24</h3>
                            <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of 40</h3>
                        </div>
                    </div>
                    <div className='separator h-20 border-[1px] border-black self-center'></div>
                    <div className='w-28 h-16 rounded-lg flex flex-col'>
                        <h3 className='text-xs font-medium self-center'>Highest Score</h3>
                        <div className='h-16 flex flex-col'>
                            <h3 className='text-2xl text-DarkBlue font-body font-semibold mt-2 self-center'>36</h3>
                            <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of 40</h3>
                        </div>
                    </div>
                </div>
            </div>
            <BarChart/>
        </>
    )
}

const AssessmentInfo = () => {
    return (
        <>
            <div className='w-48 lg:ml-8'>
                <GaugeGraph percentage={60}/>
                <div className='absolute flex flex-col items-center -mt-20 ml-16'>
                    <h4 className='text-3xl font-bold font-sans'>60%</h4>
                    <p className='text-sm'>Average</p>
                </div>
            </div>
            <div className='w-full lg:w-48 lg:mr-12 my-auto font-medium text-xs flex flex-col gap-2'>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <TiGroup/>
                        <p>Participants</p>
                    </div>
                    <p>65</p>
                </div>
                <hr className='border-b-2 border-black'></hr>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <FcQuestions/>
                        <p>Questions</p>
                    </div>
                    <p>20</p>
                </div>
                <hr className='border-b-2 border-black'></hr>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <LuAlarmClock/>
                        <p>Avg. Time</p>
                    </div>
                    <p>00:29:54</p>
                </div>
            </div>
        </>
    )
}

const TopicUnderStanding =()=> {
    const data = [{name: "Number System", value: 86}, {name: "History of Computer", value: 52}, {name: "Turing Machine", value: 36}, {name: "Operating System", value: 20}, ]
    return (
        <div className='w-full h-full'>
            <h4 className='text-sm font-medium'>Topic Understanding</h4>
            <PolarChart inputData={data}/>
        </div>
    )
}
export default Reports