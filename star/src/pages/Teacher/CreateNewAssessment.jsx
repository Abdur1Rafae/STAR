import React ,{ useState, useRef }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import SubmitButton from '../../components/button/SubmitButton';
import ToggleButton from '../../components/button/ToggleButton';
import { BsInfoCircle } from "react-icons/bs";
import { GrTestDesktop } from "react-icons/gr";
import { FcAddImage } from "react-icons/fc";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { MdPublish } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";



function CreateNewAssessment() {
   const fileInputRef = useRef(null);
   const [image, setImage] = useState(null)
   const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         const imageUrl = URL.createObjectURL(file);
         setImage(imageUrl);
      }
   };


   const handleClick = () => {
      fileInputRef.current.click();
   };

   const handleDeleteImage = () => {
      setImage(null); 
      fileInputRef.current.value = null; 
   };
    
  return (
   <div className=' w-full h-full font-body  border border-black '>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
         <SideBar active={"Live Monitoring"}/>
         <div className='h-fit	'>
            <Subheader name={"Create New Assessment"}/>
            <div className='flex md:flex-row flex-col justify-center items-center sm:h-96 md:h-64 m-4 border border-black bg-[#F4F9FD]'>
               <div className='md:w-2/3 w-full'>
                  <h2 className='ml-4 mt-2 text-sm font-semibold'>Assessment Title</h2>
                  <input className='px-2 font-sans h-10 w-4/5 ml-4 mr-8 mt-2 mb-4 border border-black rounded' />
                  <h2 className='ml-4 mt-2 text-sm font-semibold'>Description</h2>
                  <textarea className='p-2 font-sans resize-none h-24 w-4/5 ml-4 md:mr-8 mr-0 mt-2 border border-black rounded' />
               </div>
               <div className='md:w-1/3 flex flex-col justify-center items-center'>
                  <h2 className='mt-2 text-sm font-semibold '>Cover Image</h2>
                  <div className='w-1/2 flex justify-center items-center'>
                     <input
                           type="file"
                           ref={fileInputRef}
                           onChange={handleFileInputChange}
                           style={{ display: 'none' }}
                     />
                     <button className={`${image ? 'hidden' : 'w-36 h-36'}`} onClick={handleClick}>
                        <FcAddImage className='w-full h-full' />
                     </button>
                     {image && (
                        <div className='flex flex-col gap-4'>
                           <img src={image} alt="Uploaded Image" className='w-24 h-24'/>
                           <div className='flex justify-between '>
                              <button onClick={handleDeleteImage}><MdOutlineDeleteOutline className='text-2xl hover:text-red-500 hover:cursor-pointer'/></button>
                              <button className={`w-8 h-8`} onClick={handleClick}>
                                    <FcAddImage className='w-full h-full' />
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className='w-auto flex md:flex-row flex-col m-4 gap-4'>
               <div className='w-full md:w-2/3  border border-black bg-[#F4F9FD] p-2' >
                  <h2 className='text-sm font-semibold '>Assessment Detail</h2>

                  <hr class="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-400" />

                  <h2 className='text-sm font-semibold'>Participant</h2>
                  <div className='flex items-center gap-2 mt-2'>
                     <div className='bg-white p-2 min-h-8 w-full border border-black rounded' />
                     <SubmitButton label = 'Select' active={true}/>
                  </div>

                  <div className='flex md:flex-row flex-col mt-4 items-center justify-around'>
                     <div className='flex flex-col items-center'>
                        <h2 className='mt-2 text-xs md:text-sm font-semibold'>Duration</h2>
                        <div className='flex items-center'>
                           <p className='text-sm mt-1'>Hours</p>
                           <input type='number' onKeyDown={(event) => event.preventDefault()} onPaste={(event) => event.preventDefault()} max={2} min={0} 
                           className='ml-2 w-8 text-sm mt-2 border border-black rounded' />
                           <p className='text-sm mt-1 ml-4'>Mins</p>
                           <input type='number' onKeyDown={(event) => event.preventDefault()} onPaste={(event) => event.preventDefault()} max={60} min={0} 
                           className='ml-2 w-8 text-sm mt-2 border border-black rounded' />
                        </div>
                     </div>
                     <div className='flex flex-col items-center'>
                        <h2 className='mt-2 text-xs md:text-sm font-semibold'>Open Date & Time</h2>
                        <input type='datetime-local' className='mt-2 w-44 border border-black rounded text-xs' /> 
                     </div>
                     <div className='flex flex-col items-center'>
                        <h2 className='mt-2 text-xs md:text-sm font-semibold flex items-center'>
                           Close Date & Time &nbsp; <BsInfoCircle/>
                        </h2>
                        <input type='datetime-local' className='mt-2 w-44 border border-black rounded text-xs' /> 
                     </div>
                  </div>
               </div>

               <div className='p-2 md:w-1/3 border border-black bg-[#F4F9FD]'>
                  <div className='flex gap-2'>
                     <MdPublish className='' size={23}/>
                     <div className='flex flex-col'>
                        <h2 className='text-sm font-semibold '>Release Grades</h2>
                        <p className='text-xs text-gray-400'>Schedule when students can view their score</p>
                     </div>
                  </div>
                  <div class="flex items-center mt-4">
                     <input id="default-checkbox" type="radio" name='publish' value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Immediately after close date</label>
                  </div>
                  <div class="flex items-center mt-2">
                     <input checked id="checked-checkbox" type="radio" name='publish' value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Later, until manually published</label>
                  </div>
                  <div className='flex items-center mt-8'>
                     <div className='flex gap-2'>
                        <VscPreview className='' size={23}/>
                        <div className=''>
                           <h2 className='flex text-sm font-semibold items-center'>
                              View Submissions &nbsp;
                              <BsInfoCircle/>
                           </h2>
                           <p className='text-xs text-gray-400'>Allow students to view their responses after submission</p>
                        </div>  
                     </div>
                     <ToggleButton />
                  </div>
               </div>
            </div>
            <div className='h-full w-auto m-4 border border-black bg-LightBlue p-2 '>
               <h2 className='text-sm font-semibold '>Configurations</h2>
               <hr class="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-400" />
               <div className='flex md:flex-row flex-col gap-4 items-start'>
                  <div className='w-full'>
                     <div className='flex'>
                        <MdOutlineDisplaySettings size={24}/>
                        <div className='ml-2'>
                           <h2 className='text-sm font-semibold'>Presentation Options</h2>
                           <p className='text-xs text-gray-400 '>Customizes how questions are viewed by candidates.</p>
                        </div>
                     </div>
                     <div class="flex items-center my-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Randomize questions</label>
                     </div>
                     <div class="flex items-center my-4">
                        <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Option Shuffle</label>
                     </div>
                     <div class="flex items-center my-4">
                        <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Allow navigation</label>
                     </div>
                  </div>
                  <div className='mb-2 md:h-36 md:w-0 w-full border border-black '></div>
                  <div className='w-full'>
                     <div className='flex '>
                        <VscFeedback className='' size={29}/>
                        <div className='ml-2'>
                           <h2 className='text-sm font-semibold'>Feedback Options</h2>
                           <p className='text-xs text-gray-400 '>Customizes how candidate view score and receive feedback during assessment.</p>
                        </div>
                     </div>
                     <div class="flex items-center my-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Allow Instant Feedback</label>
                     </div>
                     <div class="flex items-center my-4">
                        <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Show Final Score</label>
                     </div>
                  </div>
                  <div className='mb-2 md:h-36 md:w-0 w-full border border-black'></div>
                  <div className='w-full'>
                     <div className='flex'>
                        <GrTestDesktop className='mt-1' size={25}/>
                        <div className='ml-2'>
                           <h2 className='flex text-sm font-semibold items-center'>Adaptive Testing
                           <BsInfoCircle size={14} className='ml-2'/></h2>
                           <p className='text-xs text-gray-400 '>Customizes question difficulty based on students’ responses.</p>
                        </div>
                        <ToggleButton/>
                     </div>
                     <div className='flex mt-4'>
                        <div className='flex'>
                           <PiChalkboardTeacherLight className='' size={34}/>
                           <div className='ml-2'>
                              <h2 className='flex items-center text-sm font-semibold'>Candidate Monitoring
                              <BsInfoCircle size={14} className='ml-2'/></h2>
                              <p className='text-xs text-gray-400 '>Detect and flag suspicious behavior of students during assessment.</p>
                           </div>
                           <ToggleButton/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='flex justify-center mb-8'>
               <SubmitButton label = "Save and Add Questions"  active={true}/>
            </div>
         </div>

      </div>
      
   </div>
);
}

export default CreateNewAssessment;
