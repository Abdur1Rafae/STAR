import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { IoAddCircleOutline } from "react-icons/io5";



function AddQuestions() {
    
  return (
    <div className=' w-full h-full font-body  border border-black '>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Add Questions"}/>
            <div className='w-full '>
                <Subheader name={"Add Questions"}/>
                <div className='h-16 m-4 border border-dashed  border-black flex items-center'>
                    <div className=' px-2'><IoAddCircleOutline size={21} /></div>
                    <div className='text-md'>Add Question</div>
                </div>
                <div className='m-4 h-fit md:w-1/6 border border-black'>
                <div>
                    <div className='flex items-center py-4'>
                        <div className=' px-2'><IoAddCircleOutline size={18} /></div>
                        <div className='text-sm'>Multiple Choice</div>
                    </div>
                    <div className='w-full border border-black-500'> </div>
                </div>
                <div>
                    <div className='flex items-center py-4'>
                        <div className=' px-2'><IoAddCircleOutline size={18} /></div>
                        <div className='text-sm'>True/False</div>
                    </div>
                    <div className='w-full border border-black'> </div>
                </div>
                <div>
                    <div className='flex items-center py-4'>
                        <div className=' px-2'><IoAddCircleOutline size={18} /></div>
                        <div className='text-sm'>Short Answers</div>
                    </div>
                    <div className='w-full border border-black-500'> </div>
                </div>
                <div>
                    <div className='flex items-center py-4'>
                        <div className=' px-2'><IoAddCircleOutline size={18} /></div>
                        <div className='text-sm'>Question Bank</div>
                    </div>
                    <div className='w-full border border-black'> </div>
                </div>
                <div>
                    <div className='flex items-center py-4'>
                        <div className=' px-2'><IoAddCircleOutline size={18} /></div>
                        <div className='text-sm'>Reuse Question</div>
                    </div>
                    <div className='w-full border border-black-500'> </div>
                </div>
                <div>
                    <div className='flex items-center py-4'>
                        <div className=' px-2'><IoAddCircleOutline size={18} /></div>
                        <div className='text-sm'>Add Question</div>
                    </div>
                    <div className='w-full border border-black-500'> </div>
                </div>
                </div>
                
            </div>
                
        </div>
    </div>
  );
}

export default AddQuestions;
