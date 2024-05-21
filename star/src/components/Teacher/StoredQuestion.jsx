import React from 'react'
import { useState } from 'react';
import { TbLayoutNavbarExpand, TbLayoutBottombarExpand } from "react-icons/tb";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import QuizImage from '../Student/question/QuizImage';
import QuestionCreator from './QuestionCreator';
import { ToggleStore } from '../../Stores/ToggleStore';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const StoredQuestion = ({topicList, type,topic, id, handleDrag, question, skill, difficulty, points, image, explanation, options, correctOptions, savingHandler ,deleteHandler, isTrue, reuse}) => {
    const [display, setDisplay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const Ordering = ToggleStore((store)=> store.Ordering)
    const modules = {
        toolbar: false
    };

  return (
    <div draggable={Ordering} onDragStart={(e) => handleDrag(e, id)} className={`w-full bg-[#EEF3F3] rounded-lg border-[1px] border-black p-2 overflow-hidden flex gap-2 ${Ordering ? 'hover:cursor-grabbing' : ''}`}>
        <div className='flex flex-col w-full'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex gap-2 items-center font-body'>
                    <SkillBox skill={skill}/>
                    <DifficultyBox difficulty={difficulty}/>
                    <PointBox point={points}/>
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
                <div className={`w-full ${isEditing ? 'hidden' : 'w-full'}`}>
                    <div className='flex gap-2'>
                        <ReactQuill readOnly={true} modules={modules} value={display || question.length <=25 ? (question) : (question.slice(0, 90)+'...')} className='w-full text-xs font-body !border-none -p-2'/>
                    </div>
                </div>
            </div>
            <div className={`overflow-hidden flex flex-col w-full transition-all ease-out duration-500 ${display ? 'p-2' : 'p-0 opacity-0 pointer-events-none h-0'}`}>
                {
                    isEditing ?
                    <>
                        <QuestionCreator savingHandler={savingHandler} closeHandler={()=>setIsEditing(false)} topicList={topicList} type={type} questionID={id} topic={topic} correctOptions={correctOptions} skill={skill} difficultyLevel={difficulty} points={points} question={question} explanation={explanation} options={options} image={image} isTrue={isTrue} reuse={reuse}/>
                    </>
                    :
                    <>
                        {image !== null && image !== undefined ? <button className='h-32 w-40'><QuizImage imageUrl={image} /></button> : <></>}
                        {
                            type == "MCQ" ? 
                            (
                                <div className='flex flex-col gap-2 mt-2'>
                                    {options.map((option, index)=>{
                                        return <OptionBox key={index} option={option} isActive={correctOptions.includes(option)}/> 
                                    })}
                                </div>
                            )
                            :
                            type == "True/False" ?
                            (
                                <div className='flex flex-col gap-2 mt-2'>
                                    {options.map((option, index)=>{
                                        return <OptionBox key={index} option={option} isActive={(option == "True" && isTrue) || (option == "False" && !isTrue)}/> 
                                    })}
                                </div>
                            )
                            :
                            <></>
                        }
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