import React, { useState } from 'react';
import logo from './logo-2.png'
import nas from './New Assessment - integrated.png'
import mi from './Monitoring.jpeg'
import abc from './livemonitor.jpeg'
import qst from './Question.png'
import cover1 from './cover1.jpg'
import cover2 from './cover2.jpeg'
import cover5 from './cover5.jpg'
import { IoMdMenu } from "react-icons/io";


const LandingPage = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
return (
<div className='w-full scroll-smooth bg-LightBlue font-outfit '>
    <div className='flex items-center justify-between bg-DarkBlue'>
    <div className="menuleft logo flex justify-start bg-DarkBlue md:bg-transparent">
      <img src={logo} className=' w-40'></img>
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

    <div className=' md:h-fit bg-DarkBlue bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))] md:content-center max-md:py-8  pt-8 '>
        <h1 className='font-bold text-2xl md:text-5xl text-white  w-full flex flex-col items-center'>Unleash  your Arete</h1>
        <div className='w-full flex flex-col items-center'> 
        <p className='font-normal text-white text-center text-xs md:text-xl mt-4 w-1/2'>Personalized learning that empowers you to reach your full potential</p>
        </div>
        <div className='relative  w-full flex flex-col items-center mt-2 rounded-lg '>
        <button onClick={()=>{window.location.assign('/signup')}} className='bg-black px-8 md:px-12 md:py-4 text-sm text-white rounded-[10px] mt-4'>Get Started</button>
        <img src={cover1} alt=""  className=' md:rounded-tl-[60px] md:rounded-tr-[60px]  pt-6 w-1/2 md:h-1/2 '/>
        </div>
    </div>

    <div className="relative w-full overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black md:bg-gradient-to-l md:from-transparent md:to-gray-400 opacity-100">
    <div className="absolute md:w-1/2 h-full py-8 md:py-44 px-12 z-10">
      <h2 className="text-DarkBlue text-3xl md:text-5xl font-bold text-center">
        Your Journey Starts Here
      </h2>
      <p className="text-white text--md md:text-xl font-bold text-center mt-6">
        Arete (ἀρετή) is an ancient Greek concept that goes beyond just grades; it's about unlocking your full potential across all aspects of learning. It's about discovering your unique strengths, understanding areas for growth, and striving for excellence.
      </p>
    </div>
  </div>
  <img src={cover2} alt="" className="w-full lg:h-screen md:opacity-100 opacity-20 object-cover object-top" />
</div>


    <div className=' md:flex gap-8 bg-DarkBlue bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))]  md:grid grid-cols-2 content-center  items-center rounded-lg mt-12 p-12'>
          <div className='basis-1/2'>
            <h2 className='text-white text-3xl md:text-5xl text-center'>Create Assessment 10x Faster </h2>
            <p className='text-white text-md text-center mt-12' >Accelerate assessment creation with our intuitive platform interface, simplifying the process for educators. Seamlessly import content and craft dynamic quizzes swiftly, saving valuable time. Experience efficient assessment development, empowering educators to focus on student learning.</p>
          </div>
            <div className='basis-1/2 max-h-96 overflow-hidden max-md:mt-12'>
              <img src={nas} alt="" className='rounded-lg border-black' />
            </div>
    </div>

   <div className='md:flex gap-8 mt-12 overflow-hidden px-2 '>
    <div className='z-10 basis-1/2 border-2 rounded-lg border-DarkBlue  border-dashed  md:h-fit bg-white p-8'>
      <h2 className='text-3xl  text-DarkBlue'>Monitor Progress in Real-Time </h2>
      <p className='text-DarkBlue text-md  mt-6 h-24' >Track performance instantly with live monitoring, enhancing efficiency tenfold. Stay informed with real-time insights, optimizing decision-making processes. Elevate productivity and precision through dynamic monitoring capabilities</p>
      <img src={abc} alt="" className='rounded-lg mt-12 z-0 max-h-80 mx-auto border-black border-2' />
    </div>
    <div className='z-10 basis-1/2 border-2 rounded-lg border-DarkBlue  border-dashed  md:h-fit bg-white p-8 max-md:mt-12'>
    <h2 className='text-3xl  text-DarkBlue'>Live Monitoring of Students </h2>
    <p className='text-DarkBlue text-md  mt-6 h-24' >Utilizing advanced computer vision, our platform monitors student activity during tests, ensuring integrity effortlessly. Real-time analysis detects anomalies, maintaining fairness and academic honesty seamlessly.</p>
    <img src={qst} alt="" className='rounded-lg mt-16 md:mt-12 z-0 max-h-80 mx-auto border-black border-2' />
    </div>
    </div> 
    


    <div className=' md:flex gap-8 bg-DarkBlue bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))]  md:grid grid-cols-2 content-center  items-center rounded-lg mt-12 p-12'>
    <div className='basis-1/2 max-h-96 overflow-hidden'>
              <img src={mi} alt="" className='rounded-lg border-black border-2' />
            </div>
          <div className='basis-1/2 max-md:mt-12'>
            <h2 className='text-white text-3xl md:text-5xl text-center'>Powerful Analysis on Results </h2>
            <p className='text-white text-md text-center mt-12' >Our platform's analytics drive unparalleled insight, empowering swift decision-making. With precision and efficiency, unlock hidden trends and opportunities, accelerating your path to success. Harness the power of data to propel your journey forward with confidence.</p>
          </div>
          
    </div>


  <div className='bg-black bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))] rounded-lg mt-12 px-12 py-6' >
    <div className=' flex flex-col md:flex-row items-center gap-8  md:h-4/6  '>
            
      <div className='w-full gap-6 pt-12 '>
        <h2 className='text-white text-3xl md:text-4xl font-bold'>See Beyond Grades </h2>
        <h2 className='text-white text-3xl md:text-4xl font-bold'>See Every Student’s Potential</h2>
        <button className='p-2 border-white border-2 text-white mt-4' onClick={()=>{window.location.assign('/signup')}}>Join Arete</button>

      </div>
      <div className='basis-1/2'>
        <img  src={cover5} className='rounded-lg'></img>
      </div>
    </div>
    <div className='w-full border text-white mt-4 flex'></div>
    
    <div className='text-white pt-4 flex flex-col items-center'>All Right Reserved Arete 2024</div>
  </div>

</div>
);
}
export default LandingPage;