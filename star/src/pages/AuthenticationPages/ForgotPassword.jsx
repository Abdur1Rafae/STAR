import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import fgimage from './fg-image.png';
import { ForgotPassword } from '../../APIS/AuthAPI';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [disableResend, setDisableResend] = useState(false);
  const [timer, setTimer] = useState(60);


  const handleResendClick = () => {
    setDisableResend(true);
    setTimer(60);
  };

  useEffect(() => {
    let interval;

    if (disableResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setDisableResend(false); 
    }

    return () => clearInterval(interval);
  }, [disableResend, timer]);


  const handleFindPasswordClick = async() => {
    try {
      const res = await ForgotPassword({email: email})
      console.log(res)
      setShowOTP(true);
    } catch(err) {
      console.log(err)
    } 
  };

  const renderOTP = () => (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold py-4">Enter OTP</h2>
      <div class="flex items-center justify-center gap-3">
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-DarkBlue focus:ring-1 focus:ring-DarkBlue"
                maxlength="1" />
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-DarkBlue focus:ring-1 focus:ring-DarkBlue"
                maxlength="1" />
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-DarkBlue focus:ring-1 focus:ring-DarkBlue"
                maxlength="1" />
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-DarkBlue focus:ring-1 focus:ring-DarkBlue"
                maxlength="1" />
        </div>
        <button
          type="button"
          className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue' : 'bg-slate-500'} text-white text-sm py-4 self-center`}
        >
          Verify
        </button>
        <div className="flex items-center justify-center gap-2 self-center">
          <span className="text-xs">Didn't get OTP</span>
          <button className={`text-xs ${disableResend ? 'text-gray-500 cursor-not-allowed' : 'text-[#2D79F3]'}`} onClick={handleResendClick} disabled={disableResend}>
            Resend {disableResend && `(${timer}s)`}
          </button>
        </div>
    </div>
  );

  // JSX for form
  const renderForm = () => (
    <div className="m-4 lg:m-16 h-fit max-md:py-8 md:p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold py-4">Forgot Password</h2>
      <p className="text-xs text-red-500 flex flex-col items-center mt-2">{error}</p>
      <form className="w-full flex flex-col">
        <label className="text-md font-semibold">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          className="rounded-lg text-xs h-fit w-full my-2 py-4 px-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          onClick={check ? handleFindPasswordClick : () => {}}
          className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue' : 'bg-slate-500'} text-white text-sm py-4 self-center`}
        >
          Find Password
        </button>
        <div className="flex items-center justify-center gap-2 self-center">
          <span className="text-xs">Don't have an Account? </span>
          <button type='button' onClick={()=>{window.location.assign('/signup')}} className="text-xs text-[#2D79F3]">Sign Up</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full h-screen font-body">
      <div className={`menu-container w-full h-14 bg-DarkBlue flex items-center `}>
        <div className="w-full">
          <div className="menuleft logo flex justify-start">
            <img src={logo} className="w-44 h-14 mr-2"></img>
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-2 w-full h-full lg:content-center bg-[#F4F9Fd]">
        <div className="mt-4 md:mt-4 lg:mt-16">
          <h1 className="font-bold md:text-3xl text-center">No Worries ! <br /> We are finding your Account</h1>
          <div className="flex flex-col items-center justify-center pt-8  ">
            <img src={fgimage} alt="" className=""></img>
          </div>
        </div>

        {showOTP ? renderOTP() : renderForm()}
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
