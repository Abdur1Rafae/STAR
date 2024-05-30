import React, { useState } from 'react';
import logo from '../../components/logo.png';
import cover1 from './cover1.png'
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
<div className='w-full scroll-smooth font-Poppins '>
    <div className='flex items-center justify-between bg-DarkBlue'>
    <div className="menuleft logo flex justify-start">
      <img loading="lazy" src={logo} className='w-44 h-14'></img>
    </div>
    <div className='w-full col-span-5 md:hidden'>
          <button
            data-ripple-light="true"
            data-popover-target="menu"
            className="w-full select-none rounded-lg  py-3 px-6 text-right align-right font-sans text-xs font-bold uppercase text-white  transition-all  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={toggleDropDown}
          >
            <IoMdMenu className="inline-block  " size={28}/>
          </button>
          <div className="">
            <ul
              role="menu"
              data-popover="menu"
              data-popover-placement="bottom"
              className={` absolute right-1 left-1 z-10 min-w-5/6 overflow-hidden rounded-md   p-3  font-sans text-sm font-normal text-blue-gray-500   transition-all	 ease-in-out duration-500  ${
                isDropDownOpen ? 'h-64 bg-[#F4F9FD] shadow-lg shadow-blue-gray-500/10 ' : 'h-0 bg-[#2C6491] overflow-hidden'
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
    <div className='max-md:hidden col-span-4 flex gap-x-8 text-white font-semibold text-sm '>
        <button>Home</button>
        <button>Features</button>
        <button>About us</button>
        <button>Pricing</button>
    </div>
    <div className='max-md:hidden col-span-4 flex gap-x-8 text-white font-semibold justify-end text-sm'>
        <button onClick={()=>{window.location.assign('/signup')}}>Sign up</button>
        <button onClick={()=>{window.location.assign('/login')}} className='bg-white px-8 py-2 rounded-md text-black'>Login</button>
    </div>
    </div>
    <div className='md:sticky top-0 md:h-screen w-full bg-DarkBlue md:content-center max-md:py-8 max-md:px-4 pt-12'>
        <h1 className='font-bold text-2xl md:text-5xl text-white  w-full flex flex-col items-center'>Unleash  your Arete</h1>
        <p className='font-medium text-white text-center text-xs md:text-2xl  flex flex-col items-center mt-4'>Personalized learning that empowers you to reach your full potential</p>
        <div className='relative h-96 bg-DarkBlue w-full flex flex-col items-center mt-4 '>
        <button onClick={()=>{window.location.assign('/signup')}} className='bg-black px-8 py-2 md:px-12 md:py-4 text-sm text-white rounded-[10px]'>Get Started</button>
        <img loading="lazy" src={cover1} alt=""  className='h-[280px] md:h-full md:w-1/3  bg-white absolute top-24 rounded-tl-[100px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[100px]  pt-8 '/>
        </div>
    </div>

    <div className='md:sticky top-0  bg-[#F4F9FD] h-96 md:h-screen md:grid grid-cols-2 content-center  items-center'>
        <div className='h-full w-full  flex flex-col items-center max-md:hidden md:pt-8 '>
        <img loading="lazy" src={cover2} alt="" className=''/>
        </div>
        <div className='h-full w-full flex flex-col items-center justify-center p-8 max-md:bg-gradient-to-tl from-sky-300 to-sky-700 max-md:text-white '>
            <h2 className='font-bold text-2xl md:text-5xl max-md:text-center'>Your Journey Starts Here</h2>
            <p className='text-center font-normal  text-sm md:text-lg mt-12'>Arete (ἀρετή) is an ancient Greek concept that goes beyond just grades; it's about unlocking your full potential across all aspects of learning. It's about discovering your unique strengths, understanding areas for growth, and striving for excellence.</p>
        </div>
    </div>

    <div className='md:sticky top-0 h-96 md:h-screen bg-black w-full'></div>

    <div className='max-md:bg-gradient-to-tl from-sky-300 to-sky-700 max-md:text-white  max-md:pt-8 md:sticky top-0  bg-[#F4F9FD] h-96  md:h-[calc(100vh+120px)]  md:grid grid-cols-2 content-center px-12  items-center gap-2 overflow-x-hidden overflow-y-clip'>
        <div className='md:h-full w-full'>
            <h2 className='font-bold  text-2xl md:text-5xl max-md:text-center '>Uncover Hidden Potential</h2>
            <p className='font-normal text-sm md:text-lg pt-8 md:mt-12 md:pr-8 max-md:text-center'>Arete's in-depth assessments go beyond traditional grading. We provide clear and actionable insights that reveal each student's unique learning profile. We help you identify areas where students excel and pinpoint areas that require additional support.</p>
        </div>
       <div className='h-full relative  content-center max-md:hidden '>
        <img loading="lazy" src={shapebg} alt="" className='absolute object-scale-down -top-44 right-0 -mr-12 ' />
        <img loading="lazy" src={cover3} alt=""  className='absolute w-[549px] h-[510px] rounded-[336.5px] -top-24 -right-10 -mr-12 '/>
        </div> 
       
    </div>
    <div className='md:sticky top-0 max-md:bg-gradient-to-bl from-sky-300 to-sky-700 max-md:text-white max-md:pb-8  bg-[#F4F9FD] md:h-screen md:grid grid-cols-2 content-center   items-center gap-2'>
    <div className='max-md:hidden '>
        <img loading="lazy" src={cover4} alt=""  className=''/>
        </div> 
       
        <div className='w-full md:h-screen pt-12 px-12  '>
            <h2 className='font-bold text-2xl md:text-5xl max-md:text-center '>Personalize Learning for Every Student</h2>
            <p className='font-normal text-sm md:text-xl mt-12 md:pr-8 max-md:text-center'>Arete empowers you to move beyond a one-size-fits-all approach. With our data-driven insights, you can:</p>
            <ul className="list-disc p-4 text-sm md:text-xl max-md:text-center">
                <li>Design targeted lesson plans that cater to individual student needs.</li>
                <li> Provide Differentiated instruction and activities for optimal impact. </li>
                <li>Offer personalized support and resources for students who require additional assistance.</li>
            </ul>
        </div>
      
    </div>

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
    </div>

    <div className='md:sticky top-0  h-screen w-full bg-black md:grid grid-cols-3 p-12'>
        <div className='col-span-2 content-center md:px-12 max-md:text-center'>
            <h2 className='text-white font-bold text-2xl md:text-4xl leading-normal'>
            See Beyond The Grade. 
            <br />
            See Every Student’s Potential
            </h2>
            <button onClick={()=>{window.location.assign('/signup')}} className='bg-transparent border border-white px-8 py-2 text-white mt-8 '>Join Arete</button>
        </div>

        <div className='content-center max-md:mt-12'>
            <img loading="lazy" src={cover5} alt=""  className='rounded-xl w-96'/>
        </div>
    </div>
</div>

);
}
export default LandingPage;