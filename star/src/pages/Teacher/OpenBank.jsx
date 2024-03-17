import React, {useState} from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { MdOutlineArrowBackIosNew, MdClose, MdChevronRight } from "react-icons/md"
import { useParams } from 'react-router-dom'
import TopicContainer from '../../components/Teacher/TopicContainer'
import NewButton from '../../components/button/NewButton'
import {DoughnutGraph} from '../../components/Teacher/DoughnutGraph'
import { ClickOutsideFunc } from '../../components/ClickOutsideFunc'

const OpenBank = () => {
    const {questionBank} = useParams()
    const [bankName, setBankName] = useState(questionBank)
    const [newBankName, setNewBankName] = useState(questionBank)
    const [topicDialog, setTopicDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectTopicDialog, setSelTopicDialog] = useState(false)
    const [topics, setTopics] = useState([{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12}])
    const skills = ["Problem Solving", "Logic Design", "Quantitative Analysis", "Critical Thinking"]

    const addTopicHandler = ({topicName}) => {
        setTopicDialog(false)
        const newTopic = {name: topicName ? topicName : "", value: 0, toBeEdited: true};
        const updatedTopics = [...topics];
        updatedTopics.push(newTopic);
        setTopics(updatedTopics)
    }

    const deleteTopicHandler = ({ index }) => {
        const updatedTopics = [...topics];
        updatedTopics.splice(index, 1);
        setTopics(updatedTopics); 
    };
    

    let closeTopicOptions = ClickOutsideFunc(()=>{
        setTopicDialog(false);
    })

    let handleTopicSelected = ({name}) => {
        setSelTopicDialog(false);
        addTopicHandler({topicName: name})
    }

    let saveBankName = ClickOutsideFunc(()=>{
        setIsEditing(false);
    })

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            setBankName(newBankName);
            setIsEditing(false);
        }
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
                            <div ref={saveBankName} className='flex'>
                            {
                                isEditing ? 
                                (
                                    <>                       
                                        <input 
                                            autoFocus
                                            placeholder='Bank'
                                            type='text' 
                                            value={bankName} 
                                            onChange={(e) => setNewBankName(e.target.value)} 
                                            className='text-sm md:text-md ml-2 bg-LightBlue border-none outline-none'
                                            onKeyDown={handleKeyPress}
                                        />
                                    </>

                                ) 
                                : 
                                (
                                    <>
                                        <button onClick={() => setIsEditing(true)}><h1 className='text-sm md:text-lg ml-2 font-body font-bold hover:underline'>{bankName}</h1></button>
                                    </>
                                )
                            }
                            </div>
                        </div>
                        <NewButton label={"Topic"} onClick={()=>setTopicDialog(true)}/>
                    </div>
                    <div ref={closeTopicOptions} className={`mr-4 bg-opacity-20 z-20 absolute rounded-md border-2 right-0 bg-gray-600 transition-all ease-out duration-500 ${topicDialog ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                        {topicDialog && (
                            <div className='h-20 dropdown-list w-36 flex flex-col items-center justify-around bg-LightBlue'>
                                <div tabIndex={-1} className='h-8 w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white' onClick={addTopicHandler}>
                                    <button tabIndex={-1} className='ml-2'>New topic</button>
                                </div>
                                
                                <div className='h-8 w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white' onClick={()=>setSelTopicDialog(true)}>
                                    <button className='ml-2'>Existing topic</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col-reverse md:flex-row justify-between gap-4 bg-red-100'>
                        <div className='flex-grow flex flex-col gap-4'>
                            <div className='w-full flex flex-grow flex-col gap-2'>
                                {
                                    topics.map((topic, index)=>{
                                        return <TopicContainer key={`${topic.name}-${index}`} index={index} topic={topic.name} topics={topics} toBeEdited={topic.toBeEdited ? topic.toBeEdited : false} selfDelete={deleteTopicHandler}/>
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
        {selectTopicDialog && 
            <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10'>
                <div className='relative inset-x-0 mx-auto top-20 w-6/12 bg-LightBlue'>
                    <div className='bg-DarkBlue h-12 w-full flex text-white justify-between'>
                        <h3 className='my-auto ml-2'>Select a topic</h3>
                        <button className='mr-2' onClick={()=>setSelTopicDialog(false)}><MdClose className='text-lg'/></button>
                    </div>
                    <div className='font-normal flex flex-col gap-2 max-h-80 overflow-y-auto bg-white'>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                        <TopicItem name={"New Topic"} count={20} handleSelection={handleTopicSelected}/>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

const TopicItem = ({name, count, handleSelection}) => {
    return (
        <button className='text-left w-full bg-LightBlue p-2 hover:drop-shadow-md flex justify-between items-center' onClick={()=>handleSelection({name})}>
            <div className='flex flex-col'>
                <h2 className='font-semibold'>{name}</h2>
                <h4 className='text-gray-500 text-sm'>Total Questions: <span>{count}</span></h4>
            </div>
            <MdChevronRight className='text-2xl'/>
        </button>
    )
}

export default OpenBank