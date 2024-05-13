import React, {useEffect, useState} from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useParams } from 'react-router-dom'
import NewButton from '../../components/button/NewButton'
import {DoughnutGraph} from '../../components/Teacher/DoughnutGraph'
import DisplayOnlyQuestions from '../../components/Teacher/DisplayOnlyQuestions';
import { GetQuestionsOfQB } from '../../APIS/Teacher/QuestionBankAPI'
import Loader from '../../components/Loader'

const OpenBank = () => {
    const [loading, setLoading] = useState(true)
    const {questionBank} = useParams()
    const [bankName, setBankName] = useState(questionBank)
    const [sections, setSections] = useState([])
    const [topics, setTopics] = useState({})
    const [skillSet, setSkillSet] = useState([])

    useEffect(()=> {
        const res = async() => {
            try {
                const id = localStorage.getItem('QuestionBankID')
                const Questions = await GetQuestionsOfQB({id: id})
                setTimeout(() => {
                    setQuestions(Questions.questions)
                    setSections(Questions.participants)
                    setLoading(false);
                }, 1000);
            } catch(err) {
                console.log(err)
            }
        }

        res()
    }, [])

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const topicCountMap = {};
        const skillsArray = []
        questions.forEach((question) => {
            const { topic } = question;
            if (topicCountMap.hasOwnProperty(topic)) {
                topicCountMap[topic] += 1;
            } else {
                topicCountMap[topic] = 1;
            }
            if(!skillsArray.includes(question.skill)) {
                skillsArray.push(question.skill)
            }
        });
        setTopics(topicCountMap);
        setSkillSet(skillsArray)
    }, [questions]); 

  return (
    <div className='flex flex-col font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Question Bank"}/>
                <div className={`p-4 flex overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
                    {
                       loading ?
                       <Loader/>
                       :
                       <>
                        <div className='bg-LightBlue min-h-12 w-full shadow-md flex md:flex-row flex-col gap-4 md:items-center p-2 mb-4'>
                            <div className='flex items-center gap-2'>
                                <button  onClick={()=>{window.location.assign("/teacher/library")}}><MdOutlineArrowBackIosNew className='text-2xl'/></button>
                                <div className='flex'>
                                    <h1 className='text-sm md:text-lg ml-2 font-body font-bold'>{bankName}</h1>
                                </div>
                            </div>
                            <NewButton label={"Schedule Now"}/>
                        </div>
                        <div className='flex flex-col-reverse md:flex-row justify-between gap-4'>
                            <div className='flex-grow flex flex-col gap-4'>
                                <div className='w-full flex flex-grow flex-col gap-2'>
                                    <div className={`flex flex-col gap-2 transition-all ease-out duration-500`}>
                                        {
                                            questions.map((question, index)=> {
                                                return <DisplayOnlyQuestions id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.points} question={question.question} explanation={question.explanation} options={question.options} correctOptions={question.correctOptions} image={question.imageUrl}/>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='bg-LightBlue w-full md:min-w-72 md:w-3/12 p-4'>
                                <div className='w-full ml-1'>
                                    <div className='flex text-sm font-body w-full justify-between'>
                                        <h4 className='font-medium w-24'>Questions:</h4>
                                        <div className='w-40 flex justify-center'>{questions.length}</div>
                                    </div>
                                    <div className='flex text-sm mt-2 font-body justify-between'>
                                        <h4 className='font-medium w-24'>Total Marks:</h4>
                                        <div className='w-40 flex justify-center'>{questions.reduce((totalPoints, question) => totalPoints + question.points, 0)}</div>
                                    </div>
                                    <div className='flex text-sm mt-2 font-body justify-between'>
                                        <h4 className='font-medium w-24'>Sections:</h4>
                                        <div className='w-40 flex justify-center'>{sections.map((section) => {return <p>{section}, </p>})}</div>
                                    </div>
                                </div>

                                <hr className= 'my-4 border-black border-[1px]'></hr>

                                <h3 className='font-medium text-sm font-body'>Skills Targetted</h3>
                                <div className='w-full flex flex-wrap pt-2 gap-2 font-medium'>
                                    {skillSet.map((skill, index) => (
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
                       </> 
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default OpenBank