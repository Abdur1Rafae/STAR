import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import studentimage from './student-img.png';
import { UserLogin } from '../../APIS/AuthAPI';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async () => {
    setError('');
    setCheck(false);
    if (email === '') {
      setCheck(true);
      setError('Email Required');
      return;
    }
    if (password === '') {
      setCheck(true);
      setError('Password Required');
      return;
    }
    try {
      const response = await UserLogin({
        email: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.user.accessToken);
        localStorage.setItem('userDetails', JSON.stringify(response.data.user));
        localStorage.setItem('userEmail', email);
        if (response.data.user.role === 'student') {
          window.location.assign('/student/home');
        } else {
          window.location.assign('/teacher/home');
        }
        console.log('Login successful:', response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError('User Not Found');
      } else if (error.response.status === 400) {
        setError('Invalid Email');
      } else if (error.response.status === 401) {
        setError('Invalid Credentials');
      }
      setCheck(true);
      console.log('Error:', error);
    }
  };

  return (
    <div className='w-full h-screen font-body bg-LightBlue sm:overflow-y-auto'>
      <div className={`menu-container w-full h-14 bg-DarkBlue flex items-center`}>
        <div className='w-full'>
          <div className="menuleft logo flex justify-start">
            <img src={logo} className='w-44 h-14 mr-2' alt="Logo"></img>
          </div>
        </div>
      </div>
      <div className='lg:grid grid-cols-2 w-full h-full lg:content-center bg-LightBlue'>
        <div className='mt-4 lg:mt-16'>
          <h1 className='font-bold md:text-2xl text-center ml-2'>Welcome back to the journey of learning! <br /> Let's make it a great one.</h1>
          <div className='w-full flex justify-center'>
            <img src={studentimage} alt="Student" className='md:w-[700px] lg:w-[900px]'></img>
          </div>
        </div>
        <div className='-mt-16 m-4 lg:m-16 h-fit max-md:py-8 md:p-4 flex flex-col items-center justify-center'>
          <p className='text-xs text-gray-500 flex flex-col items-center mt-8'>Please login into your account</p>
          <p className='text-xs text-red-500 flex flex-col items-center mt-2'>{error}</p>
          <form className=' w-full flex flex-col'>
            <label className='text-md font-semibold'>Email</label>
            <input 
              type="email" 
              placeholder='Enter your Email' 
              className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='text-md font-semibold mt-2'>Password</label>
            <div className='relative w-full'>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Password' 
                className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2 pr-10'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input type="checkbox" className='h-fit'/>
                <label className='text-xs'>Remember me</label>
              </div>
              <div>
                <button type='button' onClick={() => {window.location.assign('/forgot-password')}} className='text-xs text-[#2D79F3]'>Forgot Password?</button>
              </div>
            </div>
            <button type="button" onClick={check ? handleSubmit : () => {}} className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue': 'bg-slate-500' } text-white text-sm py-4 self-center`}>Login</button>
            <div className='flex items-center justify-center gap-2 self-center'>
              <span className='text-xs'>Don't have an Account? </span>
              <button type='button' onClick={() => {window.location.assign('/signup')}} className='text-xs text-[#2D79F3]'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
