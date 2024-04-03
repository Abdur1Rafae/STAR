import React from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronLeft } from 'react-icons/bi'
import SubmitButton from '../../components/button/SubmitButton'

const Grading = () => {
    const numbers = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Reports"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Grading"}/>
                <div className='w-auto h-full lg:p-4 md:p-2'>
                    <div className='w-full bg-LightBlue flex p-2 items-center shadow-md'>
                        <div className='flex items-center self-start'>
                            <BiChevronLeft className='text-3xl'/>
                            <h4 className='font-semibold'>Monthly Test</h4>
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col-reverse w-full'>
                        <div className='w-full mt-4 border-[1px] border-black'>
                            <div className='bg-LightBlue h-10 flex items-center p-2'>
                                <h3 className='font-semibold'>Question</h3>
                            </div>
                            <div className='p-4 border-b-[1px] border-black'>
                                <p className='text-sm'>In a programming context, what is the key difference between a stack and a queue, and when would you choose to use one over the other in a specific algorithm or application?</p>
                            </div>

                            <div className='p-4'>
                                <div className='bg-LightBlue h-10 flex items-center p-2 mt-4'>
                                    <h3 className='font-semibold'>Response</h3>
                                </div>
                                <div className=''>
                                    <p className='p-4 text-sm border-black border-[1px]'>In programming, a stack and a queue are both data structures that organize and manage elements. The key difference lies in their principles of access and removal. A stack follows the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed. On the other hand, a queue adheres to the First In, First Out (FIFO) principle, meaning the first element added is the first to be removed.</p>
                                </div>

                                <div className='flex md:flex-row flex-col mt-2'>
                                    <div className='w-full md:w-1/2'>
                                        <div className='flex gap-4'>
                                            <h3 className='font-medium'>Score</h3>
                                            <input type='number' className='border-[1px] border-black w-8'></input>
                                            <p>out of 4</p>
                                        </div>
                                        <div>
                                            <h3 className='font-medium'>Feedback</h3>
                                            <textarea type="text" className='p-1 w-full max-h-48 border-[1px] border-black'/> 
                                        </div>
                                    </div>
                                    <div className='w-full md:w-1/2 md:relative'>
                                        <div className='md:absolute bottom-0 right-0 flex gap-4 mt-4 justify-between md:justify-normal md:mt-0 h-6 self-end'>
                                            <button
                                                className={`font-body font-medium flex items-center text-sm pl-2 gap-2 active:shadow-lg relative h-6 ${false ? 'bg-DarkBlue text-white' : 'bg-gray-200 text-black' } w-fit px-3 rounded focus:outline-none focus:shadow-outline`}
                                                >
                                                Previous
                                            </button>
                                            <button
                                                className={`font-body font-medium flex items-center text-sm pl-2 gap-2 active:shadow-lg relative h-6 ${true ? 'bg-DarkBlue text-white' : 'bg-gray-200 text-black' } w-fit px-3 rounded focus:outline-none focus:shadow-outline`}
                                                >
                                                    Save & Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-full md:w-44 mt-4 border-[1px] border-black font-body'>
                            <div className='bg-LightBlue h-10 flex items-center justify-center p-2'>
                                <h3 className='font-semibold'>Responses</h3>
                            </div>
                            <div className='p-4 flex gap-4 flex-wrap items-center justify-center'>
                                {
                                    numbers.map((number)=> {
                                        return (
                                        <button className={`flex items-center justify-center h-6 w-6 ${true ? 'bg-DarkBlue' : 'bg-slate-400' } text-white p-2`} onClick={()=>{}}>
                                            <h3 className="self-center text-sm">
                                                {number}
                                            </h3>
                                        </button>
                                    )})
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Grading