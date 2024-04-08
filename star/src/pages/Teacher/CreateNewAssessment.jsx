import React ,{ useState, useRef, useEffect, useContext }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import SubmitButton from '../../components/button/SubmitButton';
import ToggleButton from '../../components/button/ToggleButton';
import { BsInfoCircle } from "react-icons/bs";
import { GrTestDesktop } from "react-icons/gr";
import { FcAddImage } from "react-icons/fc";
import { MdOutlineDeleteOutline,MdOutlineDisplaySettings,MdPublish,MdClose } from "react-icons/md";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { VscPreview,VscFeedback } from "react-icons/vsc";
import { GetAllClasses } from '../../APIS/Teacher/ClassAPI';
import ClassTabDisplay from '../../components/Teacher/ClassTabDisplay';
import { SectionContext } from '../../Context/SectionsContext';
import { CreateAssessment } from '../../APIS/Teacher/AssessmentAPI';



function CreateNewAssessment() {
   const [assessmentId, setAssessmentId] = useState('')
   const [assessmentName, setName] = useState('');
   const [description, setDesc] = useState('')
   const [classes, setClasses] = useState([])
   const {sections, removeSection, saveSections} = useContext(SectionContext)
   const [hour, setHour] = useState(0)
   const [mins, setMins] = useState(30)
   
   const [datetime, setDatetime] = useState('')
   const [closedatetime, setCloseDatetime] = useState('')
   const [publishImmediately, setPublishOption] = useState(false);
   const [viewSubmissions, setViewSubmissions] = useState(false);
   const [randomizeQuestions, setRandomizeQuestions] = useState(false);
   const [optionShuffle, setOptionShuffle] = useState(true);
   const [allowNavigation, setAllowNavigation] = useState(true);
   const [allowInstantFeedback, setAllowInstantFeedback] = useState(false);
   const [showFinalScore, setShowFinalScore] = useState(true);
   const [adaptiveTesting, setAdaptiveTesting] = useState(false);
   const [candidateMonitoring, setCandidateMonitoring] = useState(false);

   const handleSubmission = ()=> {
      const sectionIDs = sections.map(section=> section._id)
      const durationInMins = hour * 60 + mins

      const res = async() => {
         try {
            const data = await CreateAssessment({name:assessmentName, description:description, sections:sectionIDs, iimage:image, openDate:datetime, closeDate:closedatetime, duration:durationInMins, adaptiveTesting:adaptiveTesting,
            monitoring:candidateMonitoring, instantFeedback:allowInstantFeedback, navigation:allowNavigation, releaseGrades:publishImmediately, viewSubmission:viewSubmissions, randomizeQuestions:randomizeQuestions, randomizeAnswers:optionShuffle, finalScore:showFinalScore})
            setAssessmentId(data.assessmentId)
            window.location.assign(`/teacher/adding-questions/${data.assessmentId}`)
         } catch(err) {
            console.log(err)
         }
      }

      res()
   }

  const handleViewSubmissionsToggle = () => {
    setViewSubmissions((prevValue) => !prevValue);
  };

   const handlePublishOptionChange = () => {
     setPublishOption((prev)=>!prev);
   };

   useEffect(() => {
      if (!datetime) return;

      const selectedDate = new Date(datetime);
      const minDate = new Date(selectedDate);

      minDate.setHours(minDate.getHours() + hour);
      minDate.setMinutes(minDate.getMinutes() + mins);

      const year = minDate.getFullYear();
      const month = String(minDate.getMonth() + 1).padStart(2, '0');
      const day = String(minDate.getDate()).padStart(2, '0');
      const hours = String(minDate.getHours()).padStart(2, '0');
      const minutes = String(minDate.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      setCloseDatetime(formattedDate);
   }, [datetime, hour, mins]);



   useEffect(()=> {
      const res = async()=> {
         try {
            const classes = await GetAllClasses();
            setClasses(classes.data)
         } catch(err) {
            console.log(err)
         }
      }
      res()
   }, [])

   const [selectSectionsDialog, setSelectSectionsDialog] = useState(false)

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

   const handleHourChange = (event) => {
      let newValue = event.target.value.replace(/[^0-9]/g, '');
      newValue = Math.min(parseInt(newValue), 2);
      setHour(newValue);
   };

   const handleMinuteChange = (event) => {
      let newValue = event.target.value.replace(/[^0-9]/g, '');
      newValue = Math.min(parseInt(newValue), 60);
      setMins(newValue);
   };

   const handleOpenTimingChange = (ev)=> {
      if (!ev.target.validity.valid) return;

      const selectedDate = new Date(ev.target.value)

      const currentDate = new Date();

      if (selectedDate < currentDate) return;

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const hours = String(selectedDate.getHours()).padStart(2, '0');
      const minutes = String(selectedDate.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      setDatetime(formattedDate);
   }
   
   const handleCloseTimingChange = (ev) => {
      if (!ev.target.validity.valid) return;

      const selectedDate = new Date(ev.target.value);
      const minDate = new Date(datetime);

      minDate.setHours(minDate.getHours() + hour);
      minDate.setMinutes(minDate.getMinutes() + mins);

      if (selectedDate < minDate) return;

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const hours = String(selectedDate.getHours()).padStart(2, '0');
      const minutes = String(selectedDate.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      setCloseDatetime(formattedDate);
      console.log(formattedDate);
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
                  <input value={assessmentName} onChange={(e)=>setName(e.target.value)} className='px-2 font-sans h-10 w-4/5 ml-4 mr-8 mt-2 mb-4 border border-black rounded' />
                  <h2 className='ml-4 mt-2 text-sm font-semibold'>Description</h2>
                  <textarea value={description} onChange={(e)=>setDesc(e.target.value)} className='p-2 font-sans resize-none h-24 w-4/5 ml-4 md:mr-8 mr-0 mt-2 border border-black rounded' />
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
                     <div className='bg-white p-2 min-h-10 w-full border border-black rounded flex gap-2 flex-wrap'>
                        {
                           sections.map((section) => {
                              return (
                                 <div className='h-6 w-auto p-1 rounded-lg border-[1px] border-black'>
                                    <p className='text-xs'>{section.name}</p>
                                 </div>
                              )
                           }) 
                        }
                     </div>
                     <SubmitButton label = 'Select' active={true} onClick={()=>setSelectSectionsDialog(true)}/>
                  </div>

                  <div className='flex md:flex-row flex-col mt-4 items-center justify-around'>
                     <div className='flex flex-col items-center'>
                        <h2 className='mt-2 text-xs md:text-sm font-semibold'>Duration</h2>
                        <div className='flex items-center'>
                           <p className='text-sm mt-1'>Hours</p>
                           <input value={hour} onKeyDown={(event) => {
                              if (isNaN(event.key) && event.key !== 'Backspace') {
                                 event.preventDefault();
                              }
                           }} onChange={handleHourChange} type="number" max={2} min={0} maxLength={1}
                           className='ml-2 w-8 text-sm mt-2 border border-black rounded' />
                           <p className='text-sm mt-1 ml-4'>Mins</p>
                           <input value={mins} onKeyDown={(event) => {
                              if (isNaN(event.key) && event.key !== 'Backspace') {
                                 event.preventDefault();
                              }
                           }} onChange={handleMinuteChange} type='number' max={60} min={0}  maxLength={2}
                           className='ml-2 w-8 text-sm mt-2 border border-black rounded' />
                        </div>
                     </div>
                     <div className='flex flex-col items-center'>
                        <h2 className='mt-2 text-xs md:text-sm font-semibold'>Open Date & Time</h2>
                        <input type='datetime-local' value={datetime || ''} onChange={handleOpenTimingChange} className='mt-2 w-44 border border-black rounded text-xs'/> 
                     </div>
                     <div className='flex flex-col items-center'>
                        <h2 className='mt-2 text-xs md:text-sm font-semibold flex items-center'>
                           Close Date & Time &nbsp; <BsInfoCircle/>
                        </h2>
                        <input type='datetime-local' value={closedatetime|| ''} onChange={handleCloseTimingChange} className='mt-2 w-44 border border-black rounded text-xs'/>
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
                     <input
                        id="default-checkbox"
                        type="radio"
                        name="publish"
                        value="immediately"
                        checked={publishImmediately}
                        onChange={handlePublishOptionChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                     />
                     <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-xs font-medium text-gray-900"
                     >
                        Immediately after close date
                     </label>
                  </div>
                  <div class="flex items-center mt-2">
                     <input
                        id="checked-checkbox"
                        type="radio"
                        name="publish"
                        value="later"
                        checked={!publishImmediately}
                        onChange={handlePublishOptionChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                     />
                     <label
                        htmlFor="checked-checkbox"
                        className="ms-2 text-xs font-medium text-gray-900"
                     >
                        Later, until manually published
                     </label>
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
                     <ToggleButton isActive={viewSubmissions} onClick={handleViewSubmissionsToggle} />
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
                        <input id="default-checkbox" checked={randomizeQuestions} type="checkbox" onChange={()=>setRandomizeQuestions((prev) => !prev)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Randomize questions</label>
                     </div>
                     <div class="flex items-center my-4">
                        <input checked={optionShuffle} onChange={()=>setOptionShuffle((prev)=>!prev)} id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checked-checkbox" class="ms-2 text-xs font-medium text-gray-900">Option Shuffle</label>
                     </div>
                     <div class="flex items-center my-4">
                        <input checked={allowNavigation} onChange={()=>setAllowNavigation((prev)=>!prev)} id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
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
                        <input id="default-checkbox" checked={allowInstantFeedback} onChange={()=>{setAllowInstantFeedback((prev)=>!prev); setAllowNavigation(allowInstantFeedback)}} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="default-checkbox" class="ms-2 text-xs font-medium text-gray-900">Allow Instant Feedback</label>
                     </div>
                     <div class="flex items-center my-4">
                        <input id="checked-checkbox" checked={showFinalScore} onChange={()=>setShowFinalScore((prev)=>!prev)} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
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
                        <ToggleButton isActive={adaptiveTesting} onClick={()=>setAdaptiveTesting((prev)=>!prev)}/>
                     </div>
                     <div className='flex mt-4'>
                        <div className='flex'>
                           <PiChalkboardTeacherLight className='' size={34}/>
                           <div className='ml-2'>
                              <h2 className='flex items-center text-sm font-semibold'>Candidate Monitoring
                              <BsInfoCircle size={14} className='ml-2'/></h2>
                              <p className='text-xs text-gray-400 '>Detect and flag suspicious behavior of students during assessment.</p>
                           </div>
                           <ToggleButton isActive={candidateMonitoring} onClick={()=>setCandidateMonitoring((prev)=>!prev)}/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='flex justify-center mb-8'>
               <SubmitButton label = "Save and Add Questions" active={true} onClick={handleSubmission}/>
            </div>
         </div>
         {
         selectSectionsDialog &&
         <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
               <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-7/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                  <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                     <h3 className='my-auto ml-2'>Select Questions to add</h3>
                     <button className='mr-2' onClick={()=>setSelectSectionsDialog(false)}><MdClose className='text-lg'/></button>
                  </div>
                  <div className='overflow-y-auto no-scrollbar'>
                     <div className='h-full flex flex-col gap-4 p-4'>
                        {
                           classes.map((item, index) => (
                              <ClassTabDisplay key={`${index} ${item._id}`} id={item._id} name={item.className} classSections={item.sections} onDelete={()=>{}} />
                           ))
                        }
                     </div>   
                     <div className='absolute border-t-2 border-black left-0 bottom-0 w-full h-12 bg-LightBlue flex justify-center items-center text-white'>
                        <button className='bg-DarkBlue rounded-md px-2 py-1 min-w-16' onClick={()=>{saveSections(); setSelectSectionsDialog(false)}}>Select</button>
                     </div>            
                  </div>
               </div>
         </div>
         }

      </div>
      
   </div>
);
}

export default CreateNewAssessment;
