import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import studentimage from './student-img.png';
import { UserLogin } from '../../APIS/AuthAPI';
import cpimage from './cp-image.png';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [check, setCheck] = useState(true)

  const handleSubmit = async() => {
    setCheck(false)
    if(email == '') {
      setCheck(true)
      setError('Email Required')
      return
    }
    if(password == '') {
      setCheck(true)
      setError('Password Required')
      return
    }
    try {
      const response = await UserLogin({
         email: email,
         password: password,
      });
      if (response.status == 200) {
        setError('')
        localStorage.setItem('token', response.data.user.accessToken)
        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
        if(response.data.user.role == 'student') {
         window.location.assign('/home')
        }
        else {
         window.location.assign('/teacher/home')
        }
        console.log('Login successful:', response.data);
      }
    } catch (error) {    
      if(error.response.status == 404) {
        setError('User Not Found')
      }
      else if(error.response.status == 400) {
        setError('Invalid Email')
      }
      else if(error.response.status == 401) {
        setError('Invalid Credentials')
      }
      setCheck(true)
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
        <div className=' lg:mt-16'>
            <img src={cpimage} alt=""  className='md:w-[700px] lg:w-[900px]'></img>
        </div>
        <div className='m-4 lg:m-16 h-fit max-md:py-8 md:p-4 flex flex-col items-center justify-center'>
            <h2 className="text-2xl font-bold py-4">Change Password</h2>
          <p className='text-xs text-red-500 flex flex-col items-center mt-2'>{error}</p>
          <form onSubmit={handleSubmit} className=' w-full flex flex-col'>
               <label className='text-md font-semibold'>New Password</label>
               <input 
               type="password" 
               placeholder='Enter your New Password' 
               className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            <label className='text-md font-semibold mt-2'>Confirm Password</label>
            <input 
              type="password" 
              placeholder='Password' 
              className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={check ? handleSubmit : ()=> {}} className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue': 'bg-slate-500' } text-white text-sm py-4 self-center`}>Change Password</button>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
