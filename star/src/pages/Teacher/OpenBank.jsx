import React, {useState} from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { MdOutlineArrowBackIosNew, MdClose } from "react-icons/md"
import { useParams } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import TopicContainer from '../../components/Teacher/TopicContainer'
import NewButton from '../../components/button/NewButton'
import {DoughnutGraph} from '../../components/Teacher/DoughnutGraph'

const OpenBank = () => {
    const {questionBank} = useParams()
    const [topicDialog, setTopicDialog] = useState(false);
    const [topics, setTopics] = useState([{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12}])
    const skills = ["Problem Solving", "Logic Design", "Quantitative Analysis", "Critical Thinking"]

    const addTopicHandler = ({}) => {
        const newTopic = {name: "", value: 0, toBeEdited: true};
        const updatedTopics = [...topics];
        updatedTopics.push(newTopic);
        setTopics(updatedTopics)
    }

  return (
    <div className='flex flex-col font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Question Bank"}/>
                <div className='p-4 overflow-hidden'>
                    <div className='bg-LightBlue min-h-12 w-full drop-shadow-md flex md:flex-row flex-col gap-4 md:items-center p-2 mb-4'>
                        <div className='flex items-center gap-2'>
                            <button  onClick={()=>{window.location.assign("/teacher/library")}}><MdOutlineArrowBackIosNew className='text-2xl'/></button>
                            <h2 className='ml-4 font-medium text-sm md:text-lg flex'>{questionBank}</h2>
                            <button><MdEdit className='text-gray-400 ml-4 text-lg'/></button>
                        </div>
                        <NewButton label={"Topic"} onClick={addTopicHandler}/>
                    </div>
                    <div className='flex flex-col-reverse md:flex-row justify-between gap-4 '>
                        <div className='flex-grow flex flex-col gap-4'>
                            <div className='w-full flex-grow flex flex-col gap-2'>
                                {
                                    topics.map((topic)=>{
                                        return <TopicContainer topic={topic.name} topics={topics} toBeEdited={topic.toBeEdited ? topic.toBeEdited : false}/>
                                    })
                                }
                            </div>
                        </div>
                        <div className='bg-LightBlue w-full md:min-w-72 md:w-3/12 p-4'>
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
                                <DoughnutGraph inputData={topics}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {topicDialog && 
                <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10'>
                    <div className='relative inset-x-0 mx-auto top-20 w-6/12 bg-LightBlue'>
                        <div className='bg-DarkBlue h-12 w-full flex text-white justify-between'>
                            <h3 className='my-auto ml-2'>Create topic</h3>
                            <button className='mr-2' onClick={()=>setTopicDialog(false)}><MdClose className='text-lg'/></button>
                        </div>
                        <div className='h-24 font-normal flex'>
                            <input type='text' list='topics' className='mt-2 h-8 p-2' autoFocus placeholder='Enter/Select Topic'/>
                            <datalist id='topics'>
                                {skills.map((skill, index) => (
                                    <option key={index}>{skill}</option>
                                ))}
                            </datalist>
                            <button className='bg-DarkBlue mt-2 max-h-8 rounded-md p-2 min-w-16 text-white'>Create</button>
                        </div>
                    </div>
                </div>

            }
    </div>
  )
}

export default OpenBank