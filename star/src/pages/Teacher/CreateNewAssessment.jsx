import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import SubmitButton from '../../components/button/SubmitButton';
import ToggleButton from '../../components/button/ToggleButton';
import { BsInfoCircle } from "react-icons/bs";
import { GrTestDesktop } from "react-icons/gr";




function CreateNewAssessment() {
    
  return (
<div className=' w-full h-full font-body  border border-black '>
   <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
   <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
      <SideBar active={"Live Monitoring"}/>
      <div className='h-fit	'>
         <Subheader name={"Create New Assessment"}/>
         <div className=' md:flex sm:h-96 md:h-64 m-4 border border-black bg-[#F4F9FD]'>
            <div className='md:w-2/3  '>
               <h2 className='ml-4 mt-2 text-sm font-semibold'>Assessment Title</h2>
               <input className='h-12 w-4/5 ml-4 mr-8 mt-2 mb-4 border border-black rounded' />
               <h2 className='ml-4 mt-2 text-sm font-semibold'>Description</h2>
               <input className='h-24 w-4/5 ml-4 mr-8 mt-2 border border-black rounded' />
            </div>
            <div className=' md:w-1/3 '>
               <h2 className='ml-4 mt-2 text-sm font-semibold '>Cover Image</h2>
               <div className='h-48 w-auto m-4 border border-dashed border-black  '>
                  <div className='flex justify-center'>   
                     <img src={require('./uploadimage.png')} className='h-18 w-18' ></img>
                  </div>
                  <p className='text-xs flex justify-center '>Drop your images here, or browse</p>
               </div>
            </div>
         </div>
         <div className='w-auto md:flex m-4 h-64 '>
            <div className='mr-4 w-full md:w-2/3  border border-black bg-[#F4F9FD]' >
               <h2 className='ml-4 mt-2 text-sm font-semibold '>Assessment Detail</h2>
               <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400" />
               <h2 className='ml-4 mt-2 text-sm font-semibold'>Participant</h2>
               <div className='flex items-center'>
                  <input className='h-12 w-3/5 ml-4 mr-8 mt-2 border border-black rounded' />
                  <SubmitButton label = 'Select' active={true}/>
               </div>
               <div className='md:flex flex-row gap-4 mt-4 items-center'>
                  <div className='w-1/3 h-24 '>
                     <h2 className='ml-4 mt-2 text-xs md:text-sm font-semibold'>Duration</h2>
                     <input className='w-4/5 ml-4 mr-8 mt-2 border border-black rounded' />
                  </div>
                  <div className='md:flex justify-between mr-4'>
                     <div className=' w-1/3 h-24 '>
                        <h2 className='ml-4 md:mt-2 text-xs md:text-sm font-semibold'>Open Date & Time</h2>
                        <input className='w-4/5 ml-4 mt-2 border border-black rounded'/> 
                     </div>
                     <div className=' w-1/3 h-24 '>
                        <h2 className='md:flex ml-4 md:mt-2 text-xs md:text-sm font-semibold items-center'>
                           Close Date & Time &nbsp; 
                           <BsInfoCircle/>
                        </h2>
                        <input className='w-4/5 ml-4 mr-8 mt-2 border border-black rounded' />
                     </div>
                  </div>
               </div>
            </div>
            <div className='mt-4 md:mt-0 md:w-1/3 border border-black bg-[#F4F9FD]'>
               <div className='flex items-center'>
                  <GrTestDesktop className='ml-2 mt-2 ' size={21}/>
                  <h2 className='ml-4 mt-2 text-sm font-semibold '>Release Grades</h2>
               </div>
               <p className='ml-10 text-xs text-gray-400'>Schedule when students can view their score</p>
               <div class="flex items-center m-4">
                  <input id="default-checkbox" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Immediately after close date</label>
               </div>
               <div class="flex items-center m-4">
                  <input checked id="checked-checkbox" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Later, until manually published</label>
               </div>
               <div className='flex items-center mt-8'>
                  <div>
                     <div className='flex'>
                        <GrTestDesktop className='ml-2 mt-2 ' size={21}/>
                        <h2 className='flex ml-4 mt-2 text-sm font-semibold items-center'>
                           View Submissions &nbsp;
                           <BsInfoCircle/>
                        </h2>
                     </div>
                     <p className='ml-10 text-xs text-gray-400 pb-4'>Allow students to view their responses after submission</p>
                  </div>
                  <ToggleButton />
               </div>
            </div>
         </div>
         <div className=' relative h-full  md:h-60 min-[280px]:max-md:mt-12 min-[280px]:max-md:top-96 w-auto m-4 border border-black bg-[#F4F9FD]'>
            <           h2 className='ml-4 mt-2 text-sm font-semibold '>Configurations</h2>
            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400" />
            <div className='md:flex flex-row gap-4  items-center'>
               <div className='h-48 w-full '>
                  <div className='flex'>
                     <GrTestDesktop className='ml-2 mt-2 ' size={21}/>
                     <h2 className='flex ml-4 mt-2 text-sm font-semibold items-center'>Presentation Options</h2>
                  </div>
                  <p className='ml-10 text-xs text-gray-400 '>Customizes how questions are viewed by candidates.</p>
                  <div class="flex items-center m-4">
                     <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Randomize questions</label>
                  </div>
                  <div class="flex items-center m-4">
                     <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Randomize answers</label>
                  </div>
                  <div class="flex items-center m-4">
                     <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Allow navigation</label>
                  </div>
               </div>
               <div className='min-[280px]:max-md:w-3/4 min-[280px]:max-md:ml-12 mb-2 md:h-40 border border-black md:mb-8  '></div>
               <div className='h-48 w-full '>
                  <div className='flex'>
                     <GrTestDesktop className='ml-2 mt-2 ' size={21}/>
                     <h2 className='flex ml-4 mt-2 text-sm font-semibold items-center'>Feedback Options</h2>
                  </div>
                  <p className='ml-10 text-xs text-gray-400 '>Customizes how candidate view score and receive feedback during assessment.</p>
                  <div class="flex items-center m-4">
                     <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Allow Instant Feedback</label>
                  </div>
                  <div class="flex items-center m-4">
                     <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Show Final Score</label>
                  </div>
               </div>
               <div className='min-[280px]:max-md:w-3/4 min-[280px]:max-md:ml-12 mb-2 md:h-40 border border-black md:mb-8  '></div>
               <div className='h-48 w-full'>
                  <div className='flex'>
                     <div>
                        <div className='flex items-center'>
                           <GrTestDesktop className='ml-2 mt-2 ' size={21}/>
                           <h2 className='flex ml-4 mt-2 text-sm font-semibold items-center'>Adaptive Testing</h2>
                           <BsInfoCircle size={14} className='ml-2'/>
                        </div>
                        <p className='ml-10 text-xs text-gray-400 '>Customizes question difficulty based on students’ responses.</p>
                     </div>
                     <div>
                        <ToggleButton/>
                     </div>
                  </div>
                  <div className='flex mt-4'>
                     <div>
                        <div className='flex items-center'>
                           <GrTestDesktop className='ml-2 mt-2 ' size={21}/>
                           <h2 className='flex ml-4 mt-2 text-sm font-semibold items-center'>Candidate Monitoring</h2>
                           <BsInfoCircle size={14} className='ml-2'/>
                        </div>
                        <p className='ml-10 text-xs text-gray-400 '>Detect and flag suspicious behavior of students during assessment.</p>
                     </div>
                     <div>
                        <ToggleButton/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='flex justify-center min-[280px]:max-md:mt-96 min-[280px]:max-md:top-96 py-8'>
         <SubmitButton label = "Save and Add Questions"  active={true}/>
         </div>
      </div>

   </div>
   
</div>
  );
}

export default CreateNewAssessment;
