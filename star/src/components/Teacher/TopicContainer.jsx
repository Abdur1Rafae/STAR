import React from 'react'
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import StoredQuestion from './StoredQuestion';

const TopicContainer = ({topic}) => {
    const [display, setDisplay] = useState(false);
  return (
    <div className={`bg-LightBlue w-full md:w-8/12 border-[1px] border-black p-2 px-4 flex flex-col`}>
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
        <div className={`flex flex-col gap-2 transition-all ease-out duration-500 ${display ? 'pt-4' : 'opacity-0 h-0'}`}>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
            <StoredQuestion number={1} skill={"Logic"} difficulty={"Medium"} point={2} question={'Which among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer ch among the following period is known as the era of second generation computer'}/>
        </div>
    </div>
  )
}

export default TopicContainer