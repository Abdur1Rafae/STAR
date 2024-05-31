import React, { useState } from 'react';
import logo from './logo-2.png'
import qss from './Question Summary.png'
import nas from './New Assessment - integrated.png'
import mi from './Monitoring-integrated.png'
import qst from './Question.png'
import cover1 from './cover1.jpg'
import cover2 from './cover2.jpeg'
import cover3 from './cover3.jpg'
import cover4 from './cover4.png'
import cover5 from './cover5.jpg'
import shapebg from './shape bg.png'
import { IoMdMenu } from "react-icons/io";


const LandingPage = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
return (
<div className='w-full scroll-smooth  font-outfit bg-LightBlue   '>
    <div className='flex items-center justify-between bg-DarkBlue md:px-4  pt-2'>
    <div className="menuleft logo flex justify-start bg-DarkBlue md:bg-transparent">
      <img loading="lazy" src={logo} className=' w-40'></img>
    </div>
    <div className='w-full h-full col-span-5 md:hidden bg-DarkBlue  '>
          <button
            data-ripple-light="true"
            data-popover-target="menu"
            className="w-full select-none rounded-lg h-12  px-6 text-right align-right font-sans text-xs font-bold uppercase text-white  transition-all  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={toggleDropDown}
          >
            <IoMdMenu className="inline-block  " size={28}/>
          </button>
          <div className="mx-8">
            <ul
              role="menu"
              data-popover="menu"
              data-popover-placement="bottom"
              className={` absolute right-1 left-1 z-10 min-w-5/6 overflow-hidden rounded-md   p-3  font-sans text-sm font-normal text-blue-gray-500   transition-all	 ease-in-out duration-500  ${
                isDropDownOpen ? 'h-64 bg-[#F4F9FD] shadow-lg shadow-blue-gray-500/10 ' : 'h-0 bg-transparent overflow-hidden'
              }`}            >
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-8 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <button>
                Home
                </button>
              </li>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-8 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <button>
                Features
                </button>
              </li>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-8 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <button>
                About us
                </button>
              </li>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-8 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <button>
                Pricing
                </button>
              </li>
              <div className='w-full border border-gray-200 '></div>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-8 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <button onClick={()=>{window.location.assign('/login')}}>
                Login
                </button>
              </li>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-8 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <button onClick={()=>{window.location.assign('/signup')}} > 
                Signup
                </button>
              </li>
            </ul>
          </div>
        </div>
    <div className='max-md:hidden col-span-4 flex gap-x-8 text-white  font-semibold text-sm '>
        <button>Home</button>
        <button>Features</button>
        <button>About us</button>
        <button>Pricing</button>
    </div>
    <div className='max-md:hidden col-span-4 flex gap-x-8 text-white font-semibold justify-end text-sm'>
        <button onClick={()=>{window.location.assign('/signup')}} className='text-white'>Sign up</button>
        <button onClick={()=>{window.location.assign('/login')}} className='bg-LightBlue px-8 py-2 rounded-md text-DarkBlue'>Login</button>
    </div>
    </div>

    <div className=' md:h-fit bg-DarkBlue bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))] md:content-center max-md:py-8  pt-12 '>
        <h1 className='font-bold text-2xl md:text-7xl text-white  w-full flex flex-col items-center'>Unleash  your Arete</h1>
        <div className='w-full flex flex-col items-center'> 
        <p className='font-normal text-white text-center text-xs md:text-xl mt-8 w-1/2'>Seamlessly integrate and transform educational content into realistic, data-driven quiz assessments for an enhanced learning experience</p>
        </div>
        <div className='relative  w-full flex flex-col items-center mt-4 rounded-lg '>
        <button onClick={()=>{window.location.assign('/signup')}} className='bg-black px-8 py-2 md:px-12 md:py-4 text-sm text-white rounded-[10px] mt-4'>Get Started</button>
        <img loading="lazy" src={cover1} alt=""  className=' md:rounded-tl-[60px] md:rounded-tr-[60px]  pt-12 w-full md:h-1/2 '/>
        </div>
    </div>

    <div className='w-full md:h-screen overflow-hidden bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))] md:bg-[linear-gradient(to_left,rgba(0,255,0,0),rgba(0,0.6,0,0.6))]'>
      <div className='absolute md:w-1/2 h-full py-8 md:py-44 px-12'>
      <h2 className='text-DarkBlue text-3xl md:text-5xl font-bold text-center text-opacity-100	'>Your Journey Starts Here </h2>
            <p className='text-black text-xl text-center mt-12 text-opacity-100	' >Arete (ἀρετή) is an ancient Greek concept that goes beyond just grades; it's about unlocking your full potential across all aspects of learning. It's about discovering your unique strengths, understanding areas for growth, and striving for excellence.</p>
      </div>

              <div className=''> 
              <img src={cover2} alt="" className='w-full max-md:opacity-50'/>
              </div>
    </div>

    <div className=' md:flex gap-8 bg-DarkBlue bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))]  md:h-screen md:grid grid-cols-2 content-center  items-center rounded-lg mt-12 p-12'>
          <div className='basis-1/2'>
            <h2 className='text-white text-3xl md:text-5xl text-center'>Create Assessment 10x Faster </h2>
            <p className='text-white text-md text-center mt-12' >Accelerate assessment creation with our intuitive platform interface, simplifying the process for educators. Seamlessly import content and craft dynamic quizzes swiftly, saving valuable time. Experience efficient assessment development, empowering educators to focus on student learning.</p>
          </div>
            <div className='basis-1/2 max-h-96 overflow-hidden max-md:mt-12'>
              <img src={nas} alt="" className='rounded-lg ' />
            </div>
    </div>

   <div className='md:flex gap-8 mt-12 overflow-hidden px-2 '>
    <div className='z-10 basis-1/2 border-2 rounded-lg border-DarkBlue  border-dashed  md:h-fit bg-white p-8'>
    <h2 className='text-3xl md:text-5xl  text-DarkBlue'>Monitor Progress in Real-Time </h2>
    <p className='text-DarkBlue text-md  mt-12 h-24' >Track performance instantly with live monitoring, enhancing efficiency tenfold. Stay informed with real-time insights, optimizing decision-making processes. Elevate productivity and precision through dynamic monitoring capabilities</p>
    <img src={mi} alt="" className='rounded-lg mt-16 md:mt-12 z-0 max-h-96 w-full ' />
    </div>
    <div className='z-10 basis-1/2 border-2 rounded-lg border-DarkBlue  border-dashed  md:h-fit bg-white p-8 max-md:mt-12'>
    <h2 className='text-3xl md:text-5xl  text-DarkBlue'>Live Monitoring of Students </h2>
    <p className='text-DarkBlue text-md  mt-12 h-24' >Utilizing advanced computer vision, our platform monitors student activity during tests, ensuring integrity effortlessly. Real-time analysis detects anomalies, maintaining fairness and academic honesty seamlessly.</p>
    <img src={qst} alt="" className='rounded-lg mt-16 md:mt-12 z-0 max-h-96 w-full ' />
    </div>
    </div> 
    


    <div className=' md:flex gap-8 bg-DarkBlue bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))]  md:h-screen md:grid grid-cols-2 content-center  items-center rounded-lg mt-12 p-12'>
    <div className='basis-1/2 max-h-96 overflow-hidden'>
              <img src={mi} alt="" className='rounded-lg' />
            </div>
          <div className='basis-1/2 max-md:mt-12'>
            <h2 className='text-white text-3xl md:text-5xl text-center'>Powerful Analysis on Results </h2>
            <p className='text-white text-md text-center mt-12' >Our platform's analytics drive unparalleled insight, empowering swift decision-making. With precision and efficiency, unlock hidden trends and opportunities, accelerating your path to success. Harness the power of data to propel your journey forward with confidence.</p>
          </div>
          
    </div>
{/* 
    <div className='md:sticky top-0  bg-[#F4F9FD] w-full h-fit md:h-screen px-12 max-md:mb-8  '>
        <h2 className=' w-full flex flex-col items-center font-bold text-2xl md:text-3xl pt-12  max-md:text-center'>Features Beyond Limitations</h2>
        <div className='md:grid grid-cols-3  gap-x-8 mt-12 place-items-center  '>
            <div className="place-content-end relative max-md:mt-12 h-72  md:w-72 md:h-96 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6)),url('./pages/LandingPages/card1.jpg')] hover:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('./pages/LandingPages/card1.jpg')]  rounded-xl p-4  bg-cover bg-center md:bg-no-repeat " >
                <div className='h-12 overflow-hidden transition-all	 ease-in-out duration-500 hover:h-full '>
                <span className=' flex flex-col justify-end  items-center font-bold text-white text-xl md:text-2xl   '>
                  <h1 className='underline'>Adaptive Testing</h1>
                  <ul className="underline-none h-full  list-disc p-4 text-white text-xs md:text-sm max-md:text-center  hover:opacity-100">
                  <li>Design targeted lesson plans that cater to individual student needs.</li>
                  <li> Provide Differentiated instruction and activities for optimal impact. </li>
                  <li>Offer personalized support and resources for students who require additional assistance.</li>
                </ul>  
                  </span>
                
                </div>
            </div>
            <div className="place-content-end relative max-md:mt-12 h-72  md:w-72 md:h-96 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6)),url('./pages/LandingPages/card2.jpg')] hover:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('./pages/LandingPages/card2.jpg')]  rounded-xl p-4  bg-cover bg-center md:bg-no-repeat " >
                <div className='h-12 overflow-hidden transition-all	 ease-in-out duration-500 hover:h-full '>
                <span className=' flex flex-col justify-end  items-center font-bold text-white text-xl md:text-2xl   '>
                  <h1 className='underline'>Live Monitoring</h1>
                  <ul className="h-full  list-disc p-4 text-white text-xs md:text-sm max-md:text-center  hover:opacity-100">
                  <li>Design targeted lesson plans that cater to individual student needs.</li>
                  <li> Provide Differentiated instruction and activities for optimal impact. </li>
                  <li>Offer personalized support and resources for students who require additional assistance.</li>
                </ul>  
                  </span>
                
                </div>

            </div>
            <div className="place-content-end relative max-md:mt-12 h-72  md:w-72 md:h-96 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6)),url('./pages/LandingPages/card3.png')] hover:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('./pages/LandingPages/card3.png')]  rounded-xl p-4  bg-cover bg-center md:bg-no-repeat " >
                <div className='h-12 overflow-hidden transition-all	 ease-in-out duration-500 hover:h-full '>
                <span className=' flex flex-col justify-end  items-center font-bold text-white text-xl md:text-2xl   '>
                  <h1 className='underline'>Advanced Reporting</h1>
                  <ul className="h-full  list-disc p-4 text-white text-xs md:text-sm max-md:text-center  hover:opacity-100">
                  <li>Design targeted lesson plans that cater to individual student needs.</li>
                  <li> Provide Differentiated instruction and activities for optimal impact. </li>
                  <li>Offer personalized support and resources for students who require additional assistance.</li>
                </ul>  
                  </span>
                
                </div>

            </div>
            
        </div>
    </div> */}


<div className='bg-black bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))] h-screen rounded-lg mt-12 p-12' >
<div className=' flex gap-8  md:h-4/6  '>
         
          <div className='basis-1/3 md:basis-1/4 text-white '>
            <div className='max-md:mt-8'>Home</div>
            <div className='mt-8'>About us</div>
            <div className='mt-8'>Features</div>
            <div className='mt-8'>Pricing</div>
          </div>
          <div className='basis-1/3 md:basis-1/4 text-white '>
            <div className='max-md:mt-8'>Login</div>
            <div className='mt-8'>Signup</div>
          </div>
          <div className='basis-1/3 md:basis-1/4 text-white '>
            <div className='max-md:mt-8'>Help Center</div>
            <div className='mt-8'>Linkedin</div>
          </div>
          <div className='basis-1/2 max-md:hidden'>
          <img loading="lazy" src={cover5} className='rounded-lg'></img>
          </div>
    </div>
    <div className='md:hidden mt-12'>
          <img loading="lazy" src={cover5} className='rounded-lg'></img>
          </div>
    <div className='w-full border text-white  flex'></div>
    <div className='w-full gap-12 pt-12 '>
    <h2 className='text-white text-3xl md:text-4xl font-bold text-center'>See Beyond Grades </h2>
    <h2 className='text-white text-3xl md:text-4xl font-bold text-center'>See Every Student’s Potential</h2>

    </div>
    
    <div className='text-white pt-12 flex flex-col items-center'>All Right Reserved Arete 2024</div>
</div>

</div>
);
}
export default LandingPage;