import React, { useState } from 'react';
import logo from '../../components/logo.png';
import cpimage from './cp-image.png';
import { UserLogin, resetPassword } from '../../APIS/AuthAPI';

const Login = () => {
  const email = sessionStorage.getItem('userEmail')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCheck(false);
    
    if (password === '') {
      setCheck(true);
      setError('Password Required');
      return;
    }
    if (password !== confirmPassword) {
      setCheck(true);
      setError('Passwords do not match');
      return;
    }
    setCheck(true)
    setError('')
    try {
      const res = await resetPassword({email: email, password: password})
      console.log(res)
      window.location.assign('/login')
    } catch(err) {
      console.log(err)
    }
    
  };

  return (
    <div className='w-full h-screen font-body'>
      <div className={`menu-container w-full h-14 bg-DarkBlue flex items-center`}>
        <div className='w-full'>
          <div className="menuleft logo flex justify-start">
            <img src={logo} className='w-44 h-14 mr-2' alt="logo" />
          </div>
        </div>
      </div>
      <div className='lg:grid grid-cols-2 w-full h-full lg:content-center bg-[#F4F9Fd]'>
        <div className='lg:mt-16'>
          <img src={cpimage} alt="Change Password" className='md:w-[700px] lg:w-[900px]' />
        </div>
        <div className='m-4 lg:m-16 h-fit max-md:py-8 md:p-4 flex flex-col items-center justify-center'>
          <h2 className="text-2xl font-bold py-4">Change Password</h2>
          <p className='text-xs text-red-500 flex flex-col items-center mt-2'>{error}</p>
          <form onSubmit={handleSubmit} className='w-full flex flex-col'>
            <label className='text-md font-semibold'>New Password</label>
            <input 
              type="password" 
              placeholder='Enter your New Password' 
              className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className='text-md font-semibold mt-2'>Confirm Password</label>
            <input 
              type="password" 
              placeholder='Confirm Password' 
              className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue': 'bg-slate-500'} text-white text-sm py-4 self-center`}>
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
