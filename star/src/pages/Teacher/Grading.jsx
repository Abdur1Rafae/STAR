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
                <div className='w-auto h-full lg:p-4 p-2'>
                    <div className='w-full bg-LightBlue flex p-2 items-center shadow-md'>
                        <div className='flex items-center self-start'>
                            <BiChevronLeft className='text-3xl'/>
                            <h4 className='font-semibold'>Monthly Test</h4>
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col w-full gap-4'>
                        <div className='w-full gap-4 flex flex-col'>
                            <div className='w-full mt-4 border-[1px] border-black'>
                                <div className='bg-LightBlue h-10 flex items-center p-2'>
                                    <h3 className='font-semibold'>Question</h3>
                                </div>
                                <div className='p-4'>
                                    <p className='text-sm'>In a programming context, what is the key difference between a stack and a queue, and when would you choose to use one over the other in a specific algorithm or application?</p>
                                </div>
                            </div>
                            <div className='border-[1px] border-black'>
                                <div className='bg-LightBlue h-10 flex justify-between items-center p-2'>
                                    <h3 className='font-semibold'>Response</h3>
                                    <div className='flex gap-2 text-sm items-center'>
                                        <p>#</p>
                                        <select name="res" className='bg-LightBlue w-12'>
                                            <option value={1} className='text-green-400'>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </select>
                                        <p>/ 25</p>
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='p-4 text-sm'>In programming, a stack and a queue are both data structures that organize and manage elements. The key difference lies in their principles of access and removal. A stack follows the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed. On the other hand, a queue adheres to the First In, First Out (FIFO) principle, meaning the first element added is the first to be removed.</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:w-96 md:mt-4 border-[1px] border-black font-body'>
                            <div className='bg-LightBlue h-10 flex items-center justify-center p-2'>
                                <h3 className='font-semibold'>Marking</h3>
                            </div>
                            <div className='w-full p-2'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='font-medium text-sm'>Score</h3>
                                    <div className='flex gap-2'>
                                        <input type='number' className='border-[1px] border-black w-16 h-6'></input>
                                        <p className='text-sm'>out of 4</p>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <h3 className='font-medium text-sm'>Feedback</h3>
                                    <textarea type="text" className='resize-none p-1 w-full h-48 border-[1px] border-black text-xs'/> 
                                </div>
                                <div className='flex gap-4 mt-4 justify-center items-center md:mt-0 h-6 w-full'>
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
            </div>
        </div>
    </div>
  )
}

export default Grading