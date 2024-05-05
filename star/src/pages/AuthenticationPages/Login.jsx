import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import studentimage from './student-img.png';



const Login = () => {
  
const [isTeacherMode, setIsTeacherMode] = useState(true);

const toggleMode = () => {
  setIsTeacherMode(prevMode => !prevMode);
};
return (
<div className='w-full h-full font-body overflow-x-hidden '>
   <div className='menu-container w-full h-14 bg-DarkBlue flex items-center '>
      <div className='w-full'>
         <div className="menuleft logo flex justify-start">
            <img src={logo} className='w-44 h-14 mr-2'></img>
         </div>
      </div>
   </div>
   <div className='md:grid grid-cols-2 w-full content-center bg-[#F4F9Fd]'>
      <div >
         <h1 className='font-bold md:text-3xl text-center pt-12'>Welcome back to the journey of learning! <br /> Let's make it a great one.</h1>
         <div className='bg-red-100 w-full'>
            <img src={studentimage} alt=""  className='w-[900px] max-md:hidden'></img>
         </div>
      </div>
      <div className='m-16 h-fit max-md:py-8 md:p-4 '>
      <div className='flex flex-col items-center'>
      <div className="w-max bg-white border-2 text-xs border-black rounded-full flex rounded overflow-hidden">
      <button
        type="button"
        className={`px-4 py-2 flex items-center tracking-wider font-semibold outline-none transition-all duration-300 ${
          isTeacherMode ? 'bg-DarkBlue text-white' : 'bg-gray-50 text-black'
        }`}
        onClick={() => setIsTeacherMode(true)}
      >
        Teacher
      </button>
      <button
        type="button"
        className={`px-4 py-2 flex items-center tracking-wider font-semibold outline-none transition-all duration-300 ${
          isTeacherMode ? 'bg-gray-50 text-black' : 'bg-DarkBlue text-white'
        }`}
        onClick={() => setIsTeacherMode(false)}
      >
        Student
      </button>
    </div>
    </div>
         <span className='text-xs text-gray-500 flex flex-col items-center mt-8 '>Please login into your account</span>
         <form action="" className=''>
            <label className='text-md font-semibold ml-4'>Email</label>
            <input type="email" placeholder='Enter your Email' className='rounded-lg text-xs h-fit w-5/6 m-4 py-4 px-2'/>
            <label className='text-md font-semibold ml-4 mt-4'>Password</label>
            <input type="password" placeholder='Password' className='rounded-lg text-xs h-fit w-5/6 m-4 py-4 px-2'/>
            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-2'>
                  <input type="checkbox" className='h-fit ml-4'/>
                  <label className='text-xs'>Remember me</label>
               </div>
               <div>
                  <a href="" className='text-xs text-[#2D79F3] mr-4'>Forgot Password?</a>
               </div>
            </div>
            <button className='w-5/6 ml-8 my-8 rounded-lg bg-DarkBlue text-white text-sm py-4'>Login</button>
            <div className='flex items-center justify-center gap-2'>
               <span className='text-xs'>Dont have an Account? </span>
               <a className='text-xs text-[#2D79F3] mr-4'>Sign Up</a>
            </div>
         </form>
      </div>
   </div>
</div>
);
}
export default Login;