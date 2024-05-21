import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import Loader from '../../components/Loader'
import { BiChevronLeft } from 'react-icons/bi'
import { GetFlagDetails } from '../../APIS/Teacher/GradingAPI'
import { baseUrl } from '../../APIS/BaseUrl'
import { TiFlowSwitch } from "react-icons/ti";
import { GiInjustice } from "react-icons/gi";
import { MdClose } from 'react-icons/md'

const ViewFlags = () => {
  const [loading, setLoading] = useState(false)
  const [flaggings, setFlaggings] = useState([])
  const [selectedFlag, setSelectedFlag] = useState(0)
  const [penaliseBox, setPenaliseBox] = useState(false)

  useEffect(()=>{
    const id = localStorage.getItem('FlagId')
    const getDetails = async() => {
      try {
        const res = await GetFlagDetails({id: id})
        console.log(res)
        setFlaggings(res)
      } catch(err) {
        console.log(err)
      }
    }

    getDetails()
  }, [])

  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);

    const options = {  
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
  
    return date.toLocaleDateString('en-US', options);
  }
  const options = [];
  for (let i = 0; i <= 90; i += 5) {
    options.push(i);
  }

  const [deduct, setDeduct] = useState(0)
  const onChange = (event) => {
    setDeduct(event.target.value);
  }

  const data = [{category: 'Tab Switch', timeStamp: '16:45', img: 'data:image/jpeg;base64,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'}, {category: 'Two Faces Detected', timeStamp: '16:45'}
,{category: 'Object Detected', timeStamp: '16:45'},{category: 'No person on screen', timeStamp: '16:45'}]
  
  
  return (
    <>
         <SideBar active={"Grading"}/>
         <div className='w-full h-full'>
          <Subheader name={"Grading"}/>
          <div className={`font-body p-2 md:p-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
            {
              loading ?
              <Loader/>
              :
              <>
              <div className='w-full bg-LightBlue flex p-2 items-center justify-between shadow-md'>
                  <div className='w-full flex justify-between items-center self-start'>
                    <div className='flex items-center self-start'>
                      <button onClick={()=>{window.history.back()}}><BiChevronLeft className='text-3xl'/></button>
                      <h4 className='font-semibold'>Abdur Rafae</h4>
                    </div>
                  </div>
                  <div className='flex gap-4 active:shadow-md px-2 py-1'>
                    <button className='flex gap-2 items-center mr-2' onClick={()=>setPenaliseBox(true)}>
                      <GiInjustice/>
                      <p className='text-sm'>Penalise</p>
                    </button>
                  </div>
              </div>
              <div className='bg-LightBlue w-full flex flex-col md:flex-row h-full md:h-96 font-body'>
                <div className='w-full md:w-8/12 h-80 md:h-full flex items-center justify-center'>
                  {
                    data[selectedFlag].img ?
                    <img src={data[selectedFlag].img} className='w-full h-full'></img>
                    :
                    <TiFlowSwitch className='text-7xl'/>
                  }
                  
                </div>
                <div className='flex flex-col h-64 md:h-full flex-grow min-w-80 pl-4 border-t-2 md:border-t-0 md:border-l-2 border-black overflow-y-scroll p-4 gap-1'>
                  <h4 className='self-center border-b-2 border-black mb-2'>Flagging Details</h4>
                  {
                    data.map((flag, index) => {
                      return (
                        <>
                        <button className={`${selectedFlag == index ? 'bg-DarkBlue text-white' : ''} text-left hover:bg-DarkBlue hover:text-white p-2 transition-colors duration-200 ease-linear`} onClick={()=>setSelectedFlag(index)}>
                          <div className='flex justify-between items-center'>
                            <h7 className='text-sm'>{flag.timeStamp}</h7>
                            <div className={`text-xs bg-LightBlue w-fit p-1 rounded-full ${flag.category == 'Tab Switch' ? 'text-purple-500' : flag.category == 'No person on screen' ? 'text-yellow-600' : 'text-red-500'}`}>{flag.category}</div>
                          </div>
                          <p className='text-xs'>27 seconds</p>
                        </button>
                        <hr className='border-black'></hr>
                        </>
                      )
                    })
                  }
                </div>
              </div>
              </>
            }
          </div>
          {
            penaliseBox &&
            <div className="fixed mx-auto my-auto bg-opacity-50 inset-0 flex items-center justify-center w-full h-full bg-black">
              <div className='flex flex-col w-full mx-2 md:mx-0 md:w-1/3 bg-LightBlue'>
                <div className='bg-DarkBlue text-white h-8 w-full px-2 flex items-center justify-between'>
                  <p>Penalise Student</p>
                  <button onClick={()=>setPenaliseBox(false)}><MdClose/></button>
                </div>
                <div className='p-2'>
                  <p className='text-xs'>Based on the proof provided, you can penalise the student by deducting a percentage of marks from their final score. This deduction will calculated after you have graded every response(if any).</p>
                </div>
                <div className='px-2 flex gap-4 items-center mt-2'>
                  <h4 className='text-sm'>Deduction(%): </h4>
                  <select 
                    className="block w-18 px-4 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={deduct}
                    onChange={onChange}
                  >
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <p className='text-xs ml-2 mt-2'><strong>Once grades have been published, you cannot undo the penalty.</strong></p>
                <button className='mt-4 mb-2 self-end bg-red-500 w-fit px-2 py-1 rounded-full mr-1 text-white flex justify-center items-center'><p className='mb-1'>Penalise</p></button>
              </div>
            </div>
          }
        </div>
      </>
);
}

export default ViewFlags