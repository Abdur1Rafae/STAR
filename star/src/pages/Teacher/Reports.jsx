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

const Reports = () => {
    const [extendPerformers, setExtendPerformers] = useState(true)
    const [extendAbsentees, setExtendAbsentees] = useState(true)
    const [extendRA, setExtendRA] = useState(true)

    const data = [{name: 'Top Performers', value: 17},{name: 'Absentees', value: 6},{name: 'Requires Attention', value: 12}]

    const handleExtendPerformerSection = ()=>{
        setExtendPerformers(!extendPerformers)
    }

    const handleExtendAbsenteesSection = ()=>{
        setExtendAbsentees(!extendAbsentees)
    }

    const handleExtendRASection = ()=>{
        setExtendRA(!extendRA)
    }

  return (
    <div className='flex flex-col h-full font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Reports"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Reports"}/>
                <div className='w-full h-full p-4'>
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
                    <div className='flex w-full gap-4'>
                        <div className='mt-4 w-full'>
                            <div className='bg-LightBlue w-full flex lg:justify-between shadow-md pr-4 py-2'>
                                <AssessmentInfo/>
                            </div>
                            <div className='bg-LightBlue w-full mt-4 shadow-md p-2'>
                                <AvgHighestScore/>
                            </div>
                            <div className='bg-LightBlue w-full mt-4 shadow-md p-2'>
                                <TopicUnderStanding/>
                            </div>
                        </div>
                        <div className='w-full mt-4'>
                            <button className='bg-LightBlue border-[1px] border-black w-full h-10 px-4 text-slate-400'>
                                <div className='w-full flex items-center justify-between'>
                                    <h4 className='font-medium text-sm'>Sections: </h4>
                                    <p></p>
                                    <BiChevronDown className='text-3xl'/>
                                </div>
                            </button>
                            <div className='w-full bg-LightBlue shadow-md mt-4 p-4'>
                                <StudentDonutGraph inputData={data}/>
                                <div className='max-h-64 overflow-y-auto'>
                                    <button className='h-12 w-full my-auto' onClick={()=>{handleExtendPerformerSection()}}>
                                        <p className='p-2 border-[1px] rounded-full border-[#47A3ED] font-semibold text-xs text-[#47A3ED]'>Top Performer</p>
                                    </button>
                                    <div className={`${extendPerformers ? 'h-full' : 'h-0 hidden'} space-y-2`}>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>95%</h4>
                                        </div>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>93%</h4>
                                        </div>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>86%</h4>
                                        </div>
                                    </div>
                                    <button className='h-12 w-full my-auto' onClick={()=>{handleExtendAbsenteesSection()}}>
                                        <p className='p-2 border-[1px] rounded-full border-[#FF8100] font-semibold text-xs text-[#FF8100]'>Absentees</p>
                                    </button>
                                    <div className={`${extendAbsentees ? 'h-full' : 'h-0 hidden'} space-y-2`}>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>95%</h4>
                                        </div>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>93%</h4>
                                        </div>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>86%</h4>
                                        </div>
                                    </div>
                                    <button className='h-12 w-full my-auto' onClick={()=>{handleExtendRASection()}}>
                                        <p className='p-2 border-[1px] rounded-full border-[#E14942] font-semibold text-xs text-[#E14942]'>Requires Attention</p>
                                    </button>
                                    <div className={`${extendRA ? 'h-full' : 'h-0 hidden'} space-y-2`}>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Maaz Shamim - 22792</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>95%</h4>
                                        </div>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Saifullah Khan - 22877</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>93%</h4>
                                        </div>
                                        <div className='flex justify-between items-center border-y-[1px] border-black'>
                                            <div>
                                                <p className='text-sm font-medium'>Maaz Batla - 22794</p>
                                                <p className='text-xs'>Section: 4536</p>
                                            </div>
                                            <h4 className='text-[#3EAF3F]'>86%</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    return (
        <div className='w-1/2'>
            <PolarChart/>
        </div>
    )
}
export default Reports