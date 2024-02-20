import React from 'react'
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import StoredQuestion from './StoredQuestion';
import questionMCQ from '../MCQ.png'
import TFQuestion from '../TF.png'
import SAQuestion from '../shortAnswer.png'
import QuestionCreator from './QuestionCreator';

const TopicEditor = ({topic}) => {
    const [display, setDisplay] = useState(false);
    const [creatingQuestion, setCreateQuestion] = useState(null);
  return (
    <div className={`bg-LightBlue w-full border-[1px] border-black p-2 px-4 flex flex-col`}>
        <div className='flex justify-between'>
            <div className='flex'>
                <input type='checkbox'></input>
                <h1 className='text-sm md:text-md ml-2 font-body text-DarkBlue font-medium'>{topic}</h1>
                <button><MdEdit className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
            </div>
            <button onClick={()=>{setDisplay(!display)}}>
                {
                    display ?
                    <FaAngleUp className='text-xl self-center'/>
                    :
                    <FaAngleDown className='text-xl self-center'/>
                }
            </button>
        </div>
        <div className={`flex flex-col gap-2 transition-all ease-out duration-500 ${display ? 'pt-4' : 'opacity-0 pointer-events-none h-0'}`}>
            <div className='border-dashed border-[1px] border-black w-72 h-28 self-center p-2'>
                <h4 className='text-sm text-center'>Add a question</h4>
                <div className='w-full flex items-end justify-center gap-2 mt-2'>
                    <button className='flex flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setCreateQuestion("Multiple Choice Question")}>
                        <img className='w-12 mix-blend-multiply' src={questionMCQ}/>
                        <p className='text-xs'>MCQ</p>
                    </button>
                    <button className='flex flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setCreateQuestion("Short Question")}>
                        <img className='w-12 mix-blend-multiply' src={SAQuestion}/>
                        <p className='text-xs'>Short Question</p>
                    </button>
                    <button className='flex flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setCreateQuestion("True/False")}>
                        <img className='w-12 mix-blend-multiply' src={TFQuestion}/>
                        <p className='text-xs'>True/False</p>
                    </button>
                </div>

            </div>
            {creatingQuestion && 
                <div className={`mt-2`}>
                    <QuestionCreator type={creatingQuestion} closeHandler={()=>setCreateQuestion(null)}/>
                </div>
            }
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
        </div>
    </div>
  )
}

export default TopicEditor