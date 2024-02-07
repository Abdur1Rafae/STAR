import React from 'react'
import { useState } from 'react';
import { TbLayoutNavbarExpand, TbLayoutBottombarExpand } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import QuizImage from '../Student/question/QuizImage';

const StoredQuestion = ({number, question, skill, difficulty, point}) => {
    const [display, setDisplay] = useState(false);
  return (
    <div className='w-full bg-[#EEF3F3] rounded-lg border-[1px] border-black p-2 overflow-hidden flex gap-2'>
        <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center font-body'>
                    <input type="checkbox"/>
                    <SkillBox skill={skill}/>
                    <DifficultyBox difficulty={difficulty}/>
                    <PointBox point={point}/>
                    <div className='ml-auto flex'>
                        <button className='self-center'><MdEdit className='text-lg text-gray-400 mr-2'/></button>
                        <button onClick={()=>{setDisplay(!display)}}>
                        {
                            display ?
                            <TbLayoutBottombarExpand className='text-lg self-center text-gray-400'/>
                            :
                            <TbLayoutNavbarExpand className='text-lg self-center text-gray-400'/>
                        }
                        </button>
                    </div>
                </div>
                <div className={`w-full flex ${display ? 'flex-col-reverse' : 'flex-col'}`}>
                    <div className='flex gap-2'>
                        <h1 className='text-xs font-body'>
                            {
                                display || question.length <=25 ? (
                                    question
                                ) : (
                                    question.slice(0, 90)+'...'
                                )
                            }
                        </h1>
                    </div>
                </div>
            </div>
            <div className={`overflow-hidden flex flex-col w-full transition-all ease-out duration-500 ${display ? 'p-2' : 'p-0 opacity-0 h-0'}`}>
            <button className='h-32 w-40'><QuizImage imageUrl={'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'} /></button>
                <div className='flex flex-col gap-2 mt-2'>
                    <OptionBox option="ABCDEFGHI" id="option1" name="options" value="1" />
                    <OptionBox option="JKLMNOPQR" id="option2" name="options" value="2" />
                    <OptionBox option="STUVWXYZ" id="option3" name="options" value="3" />
                </div>
                <p className='text-xs mt-4 font-medium'>Explanation</p>
                <p className='text-xs'>oiewmwefimf foif fiof ffoinef 3w3f iweudniw difbiend ffniu3  ciuwn fi3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique in sed adipisci eius eaque nostrum magnam error ex est sequi molestiae quasi non, eos ea perspiciatis repudiandae molestias facilis veniam!</p>
            </div>
        </div>
    </div>
  )
}

const SkillBox = ({skill}) => {
    return (
        <div className='bg-LightBlue h-6 p-1 border-red-700 border-[1px] min-w-12 rounded-full text-red-700 flex justify-center items-center text-[10px]'>
            <p className='self-center'>{skill}</p>
        </div>
    )
}

const DifficultyBox = ({difficulty}) => {
    return (
        <div className='bg-LightBlue h-6 p-1 min-w-12 border-DarkBlue border-[1px] rounded-full text-DarkBlue flex justify-center items-center text-[10px]'>
            <p className='self-center'>{difficulty}</p>
        </div>
    )
}

const PointBox = ({point}) => {
    return (
        <div className='bg-LightBlue h-6 min-w-12 border-black border-[1px] rounded-full flex justify-center items-center text-[10px]'>
            <p className='self-center mt-0'>{point} Point</p>
        </div>
    )
}

const OptionBox = ({option, id, value, name}) => {
    return (
        <div className='h-auto'>
            <input type="radio" id={id} name={name} value={value} className="hidden peer" required/>
            <label htmlFor={id} className="inline-flex items-center justify-between w-full px-2 p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-800 peer-checked:bg-lime-500 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100">                           
                <p className="w-full text-sm md:text-md">{option}</p>
            </label>
        </div>
    )
} 

export default StoredQuestion