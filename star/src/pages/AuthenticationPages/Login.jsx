import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import studentimage from './student-img.png';

const Login = () => {
  return (
    <div className='w-full h-full font-body overflow-x-hidden '>
      <div className='menu-container w-full h-14 bg-DarkBlue flex items-center'>
        <div className='w-full'>
          <div className="menuleft logo flex justify-start">
            <img src={logo} className='w-44 h-14 mr-2'></img>
          </div>
        </div> 
      </div>
      <div className='grid grid-cols-2 w-full content-center bg-[#F4F9Fd]'>
        <div className='m-16 h-fit p-4 bg-[#A3CEF1]/25 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-xl'>
          <h1 className='flex flex-col items-center text-3xl text-[#02073F] font-semibold mb-4'>Login</h1>
          <form action="" className=''>
            <label className='text-md font-semibold ml-4'>Email</label>
            <input type="email" placeholder='@ Enter your Email' className='rounded-lg text-xs h-fit w-5/6 m-4 py-4 px-2'/>
            <label className='text-md font-semibold ml-4 mt-4'>Password</label>
            <input type="password" placeholder='@ Enter your Email' className='rounded-lg text-xs h-fit w-5/6 m-4 py-4 px-2'/>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input type="checkbox" className='h-fit ml-4'/>
                <label className='text-xs'>Remember me</label>
              </div>
              <div>
                <a href="" className='text-xs text-[#2D79F3] mr-4'>Forgot Password?</a>
              </div>
            </div>
            <button className='w-5/6 ml-8 my-8 rounded-lg bg-black text-white text-sm py-4'>Sign in</button>
            <div className='flex items-center justify-center gap-2'>
              <span className='text-xs'>Dont have an Account? </span>
              <a className='text-xs text-[#2D79F3] mr-4'>Sign Up</a>
            </div>
          </form>
        </div>
        <div className='overflow-x-hidden'> 
          <img src={studentimage} alt="" className='overflow-x-hidden  top-20 h-full' />
        </div>
      </div>
    </div>
  );
}

export default Login;
