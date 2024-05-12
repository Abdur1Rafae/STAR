import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import studentimage from './student-img.png';
import { UserLogin } from '../../APIS/AuthAPI';

const Login = () => {
  const [isTeacherMode, setIsTeacherMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(true)

  const handleSubmit = async() => {
    setCheck(false)
    try {
      const response = await UserLogin({
         email: email,
         password: password,
      });
      if (response.status == 200) {
        localStorage.setItem('token', response.data.user.accessToken)
        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
        if(response.data.user.role == 'student') {
         window.location.assign('/home')
        }
        else {
         window.location.assign('/teacher/home')
        }
        console.log('Login successful:', response.data);
      } else {
        console.log('Login failed:', response.statusText);
      }
    } catch (error) {    
      console.log('Error:', error);
    }
  };

  return (
    <div className='w-full h-screen font-body'>
      <div className={`menu-container w-full h-14 bg-DarkBlue flex items-center `}>
        <div className='w-full'>
          <div className="menuleft logo flex justify-start">
            <img src={logo} className='w-44 h-14 mr-2'></img>
          </div>
        </div>
      </div>
      <div className='lg:grid grid-cols-2 w-full h-full lg:content-center bg-[#F4F9Fd]'>
        <div className='mt-4 md:mt-4 lg:mt-16'>
          <h1 className='font-bold md:text-3xl text-center'>Welcome back to the journey of learning! <br /> Let's make it a great one.</h1>
          <div className='w-full'>
            <img src={studentimage} alt=""  className='md:w-[700px] lg:w-[900px]'></img>
          </div>
        </div>
        <div className='m-4 lg:m-16 h-fit max-md:py-8 md:p-4 flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center'>
            <div className="w-max bg-white border-2 text-xs border-black rounded-full flex overflow-hidden">
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
          <p className='text-xs text-gray-500 flex flex-col items-center mt-8'>Please login into your account</p>
          <form onSubmit={handleSubmit} className=' w-full flex flex-col'>
               <label className='text-md font-semibold'>Email</label>
               <input 
               type="email" 
               placeholder='Enter your Email' 
               className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            <label className='text-md font-semibold mt-2'>Password</label>
            <input 
              type="password" 
              placeholder='Password' 
              className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input type="checkbox" className='h-fit'/>
                <label className='text-xs'>Remember me</label>
              </div>
              <div>
                <a href="" className='text-xs text-[#2D79F3]'>Forgot Password?</a>
              </div>
            </div>
            <button type="button" onClick={handleSubmit} className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue': 'bg-slate-500' } text-white text-sm py-4 self-center`}>Login</button>
            <div className='flex items-center justify-center gap-2 self-center'>
              <span className='text-xs'>Don't have an Account? </span>
              <a className='text-xs text-[#2D79F3]'>Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
