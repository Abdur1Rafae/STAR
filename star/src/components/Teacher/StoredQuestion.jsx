import React from 'react'
import { useState } from 'react';
import { TbLayoutNavbarExpand, TbLayoutBottombarExpand } from "react-icons/tb";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import QuizImage from '../Student/question/QuizImage';
import QuestionCreator from './QuestionCreator';

const StoredQuestion = ({type, id, question, skill, difficulty, point, image, explanation, options, savingHandler ,deleteHandler}) => {
    const [display, setDisplay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='w-full bg-[#EEF3F3] rounded-lg border-[1px] border-black p-2 overflow-hidden flex gap-2'>
        <div className='flex flex-col w-full'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex gap-2 items-center font-body'>
                    <input type="checkbox"/>
                    <SkillBox skill={skill}/>
                    <DifficultyBox difficulty={difficulty}/>
                    <PointBox point={point}/>
                    <div className='ml-auto flex'>
                        <button className='self-center'><MdOutlineDeleteOutline onClick={deleteHandler} className='text-lg hover:text-red-400 mr-2'/></button>
                        <button className='self-center' onClick={() => {setIsEditing(true);setDisplay(true)}}><MdEdit className='text-lg text-gray-400 hover:text-black mr-2'/></button>
                        <button onClick={()=>{setDisplay(!display)}}>
                        {
                            display ?
                            <TbLayoutBottombarExpand className='text-lg self-center hover:text-DarkBlue'/>
                            :
                            <TbLayoutNavbarExpand className='text-lg self-center hover:text-DarkBlue'/>
                        }
                        </button>
                    </div>
                </div>
                <div className={`w-full flex ${display ? 'flex-col-reverse' : 'flex-col'}`}>
                    <div className='flex gap-2 ml-2'>
                        <h1 className='text-xs font-body'>
                            {
                                display || question.length <=25 ? (question) : (question.slice(0, 90)+'...')
                            }
                        </h1>
                    </div>
                </div>
            </div>
            <div className={`overflow-hidden flex flex-col w-full transition-all ease-out duration-500 ${display ? 'p-2' : 'p-0 opacity-0 pointer-events-none h-0'}`}>
                {
                    isEditing ?
                    <>
                        <QuestionCreator savingHandler={savingHandler} closeHandler={()=>setIsEditing(false)} type={type == "MCQ" ? "Multiple Choice Question" : type == "T/F" ? "True/False" : "SA"} questionID={id} skill={skill} difficultyLevel={difficulty} point={point} question={question} explanation={explanation} options={options} image={image}/>
                    </>
                    :
                    <>
                        {image !== null ? <button className='h-32 w-40'><QuizImage imageUrl={image} /></button> : <></>}
                        <div className='flex flex-col gap-2 mt-2'>
                            {options.map((option)=>{
                                return <OptionBox option={option.text} isActive={option.isCorrect}/> 
                            })}
                        </div>
                        <p className='text-xs mt-4 font-medium'>Explanation</p>
                        <p className='text-xs'>{explanation}</p>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export const SkillBox = ({skill}) => {
    return (
        <div className='bg-LightBlue h-6 p-1 border-red-700 border-[1px] min-w-12 rounded-full text-red-700 flex justify-center items-center text-[10px]'>
            <p className='self-center'>{skill}</p>
        </div>
    )
}

export const DifficultyBox = ({difficulty}) => {
    return (
        <div className='bg-LightBlue h-6 p-1 min-w-12 border-DarkBlue border-[1px] rounded-full text-DarkBlue flex justify-center items-center text-[10px]'>
            <p className='self-center'>{difficulty}</p>
        </div>
    )
}

export const PointBox = ({point}) => {
    return (
        <div className='bg-LightBlue h-6 min-w-12 border-black border-[1px] rounded-full flex justify-center items-center text-[10px]'>
            <p className='self-center mt-0'>{point} Point</p>
        </div>
    )
}

export const OptionBox = ({option, isActive}) => {
    return (
        <div  className={`${isActive ? 'bg-green-400 text-white' : 'bg-white'} items-center justify-between w-full px-2 p-1 text-gray-500 border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100`}>                           
            <p className="w-full text-sm md:text-md">{option}</p>
        </div>
    )
} 

export default StoredQuestion