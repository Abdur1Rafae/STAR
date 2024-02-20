import React from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useParams } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import TopicEditor from '../../components/Teacher/TopicEditor'
import NewButton from '../../components/button/NewButton'
import {DoughnutGraph} from '../../components/Teacher/DoughnutGraph'

const OpenBank = () => {
    const {questionBank} = useParams()
    const data = [{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12},{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12},{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12},{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12},]
    const skills = ["Problem Solving", "Logic Design", "Quantitative Analysis", "Critical Thinking"]
  return (
    <div className='flex flex-col font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Question Bank"}/>
                <div className='p-4 overflow-hidden'>
                    <div className='bg-LightBlue min-h-12 w-full drop-shadow-md flex md:flex-row flex-col gap-4 items-center p-2 mb-4'>
                        <div className='flex items-center gap-2 '>
                            <MdOutlineArrowBackIosNew className='text-6xl md:text-2xl'/>
                            <h2 className='ml-4 font-medium text-sm md:text-lg flex'>{questionBank}</h2>
                            <MdEdit className='text-gray-400 ml-4 text-6xl md:text-lg'/>
                        </div>
                        <NewButton label={"Topic"}/>
                    </div>
                    <div className='flex flex-col-reverse md:flex-row justify-between gap-4 '>
                        <div className='flex-grow flex flex-col gap-4'>
                            <div className='w-full flex-grow flex flex-col gap-2'>
                                <TopicEditor topic={"History of Computers"}/>
                                <TopicEditor topic={"History of Computers"}/>
                                <TopicEditor topic={"History of Computers"}/>
                                <TopicEditor topic={"History of Computers"}/>
                                <TopicEditor topic={"History of Computers"}/>
                            </div>
                        </div>
                        <div className='bg-LightBlue w-full md:min-w-72 md:w-5/12 p-4'>
                            <div className='w-full ml-1'>
                                <div className='flex text-sm font-body w-full justify-between'>
                                    <h4 className='font-medium w-24'>Questions:</h4>
                                    <div className='w-40 flex justify-center'>10</div>
                                </div>
                                <div className='flex text-sm mt-2 font-body justify-between'>
                                    <h4 className='font-medium w-24'>Total Marks:</h4>
                                    <div className='w-40 flex justify-center'>30</div>
                                </div>
                            </div>

                            <hr className= 'my-4 border-black border-[1px]'></hr>

                            <h3 className='font-medium text-sm font-body'>Skills Targetted</h3>
                            <div className='w-full flex flex-wrap pt-2 gap-2 font-medium'>
                                {skills.map((skill, index) => (
                                    <div key={index} className='w-auto h-8 bg-[#D9EBFF] text-xs p-2 rounded-lg'>
                                        {skill}
                                    </div>
                                ))}
                            </div>

                            <hr className= 'my-4 border-black border-[1px]'></hr>
                            
                            <h3 className='font-medium text-sm font-body'>Topics Covered</h3>

                            <div className='mt-2'>
                                <DoughnutGraph inputData={data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OpenBank