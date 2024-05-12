import React from 'react'
import { useState } from 'react';
import { TbLayoutNavbarExpand, TbLayoutBottombarExpand } from "react-icons/tb";
import QuizImage from '../Student/question/QuizImage';
import { SkillBox } from './StoredQuestion';
import { DifficultyBox } from './StoredQuestion';
import { PointBox } from './StoredQuestion';
import { OptionBox } from './StoredQuestion';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const DisplayOnlyQuestions = ({question, correctOptions, isTrue, type, skill, difficulty, point, image, explanation, options, isSelected}) => {
    const [display, setDisplay] = useState(false);
    const modules = {
        toolbar: false
    };

  return (
    <div className='w-full bg-[#EEF3F3] rounded-lg border-[1px] border-black p-2 overflow-hidden flex gap-2'>
        <div className='flex flex-col w-full'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex gap-2 items-center font-body'>
                    <input type="checkbox" checked={isSelected}/>
                    <SkillBox skill={skill}/>
                    <DifficultyBox difficulty={difficulty}/>
                    <PointBox point={point}/>
                    <div className='ml-auto flex'>
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
                    <div className='flex gap-2'>
                        <ReactQuill readOnly={true} modules={modules} value={display || question.length <=25 ? (question) : (question.slice(0, 90)+'...')} className='w-full text-xs font-body !border-none -p-2'/>
                    </div>
                </div>
            </div>
            <div className={`overflow-hidden flex flex-col w-full transition-all ease-out duration-500 ${display ? 'p-2' : 'p-0 opacity-0 pointer-events-none h-0'}`}>
                {image !== null && undefined ? <button className='h-32 w-40'><QuizImage imageUrl={image} /></button> : <></>}
                {
                    type == "MCQ" ? 
                    (
                        <div className='flex flex-col gap-2 mt-2'>
                            {options.map((option)=>{
                                return <OptionBox option={option} isActive={correctOptions.includes(option)}/> 
                            })}
                        </div>
                    )
                    :
                    type == "True/False" ?
                    (
                        <div className='flex flex-col gap-2 mt-2'>
                            {options.map((option)=>{
                                return <OptionBox option={option} isActive={(option == "True" && isTrue) || (option == "False" && !isTrue)}/> 
                            })}
                        </div>
                    )
                    :
                    <></>
                }
                <p className='text-xs mt-4 font-medium'>Explanation</p>
                <p className='text-xs'>{explanation}</p>
            </div>
        </div>
    </div>
  )
}

export default DisplayOnlyQuestions