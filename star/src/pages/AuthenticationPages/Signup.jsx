import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import studentimage from './student-img.png';
import runningman from './runningman.png';
import { UserLogin } from '../../APIS/AuthAPI';
import cover2 from './cover2.png';

const Signup = () => {
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
         role: isTeacherMode ? 'teacher' : 'student'
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
      <div className='md:flex gap-4 p-8 bg-LightBlue  h-fit overflow-x-hidden '>
            <div className='flex flex-col justify-end md:min-w-96'>
                <h1 className='font-bold text-center text-2xl md:text-left leading-relaxed'>Are you ready to take control of your learning journey?</h1>
                <h2 className='text-DarkBlue text-center text-3xl md:text-left font-semibold mt-8'>Register Now!</h2>
                <div className=' flex  flex-col  items-center  mt-8'>
                <img src={cover2} alt="" className='md:w-64  '/>
                </div>
            </div>  
            <div className='flex-auto border border-2 border-black p-4 rounded-lg max-md:mt-8'>
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
                <form className='py-4 text-sm flex-grow min-w-72' action="">
                    <div className='md:flex gap-4 mt-4'>
                        <div>
                            <input placeholder= "FirstName" type="text" className='max-md:mt-4 w-full border border-2 border-gray-200 rounded-lg p-2'/>
                        </div>
                        <div>
                            <input placeholder= "LastName" type="text" className='max-md:mt-4 w-full border border-2 border-gray-200  rounded-lg p-2'/>
                        </div>
                    </div>
                    <div className=''>
                        <input placeholder= "Email" type="email" className='mt-4 w-full border border-2 border-gray-200 rounded-lg p-2'/>
                    </div>
                    <div>
                        <input placeholder= "Organization" type="text" className=' mt-4 w-full border border-2 border-gray-200 rounded-lg p-2'/>
                    </div>
                    <div>
                        <input placeholder= "Password" type="password" className='mt-4 w-full border border-2 border-gray-200 rounded-lg p-2'/>
                    </div>
                    <div className='flex flex-col items-center' >
                    <button type="button"  className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue': 'bg-slate-500' } text-white text-sm py-4 self-center flex flex-col items-center`}>Signup</button>
                    </div>
                </form>
                <div className='flex items-center justify-center gap-2 self-center'>
                    <span className='text-xs'>Already have an Account </span>
                    <button onClick={()=>{window.location.assign('/login')}} className='text-xs text-[#2D79F3]'>Login</button>
                </div>
            </div>

            <div className=' flex flex-col justify-end'>
                <img src={runningman} alt="" className='min-w-72 min-h-64  '/>
            </div>
      </div>
    </div>
  );
}

export default Signup;
