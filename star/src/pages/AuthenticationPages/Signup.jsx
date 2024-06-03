import React, { useState} from 'react';
import logo from '../../components/logo.png';
import { UserSignup } from '../../APIS/AuthAPI';
import cover2 from './cover2.png';

const Signup = () => {
  const [isTeacherMode, setIsTeacherMode] = useState(true);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erp, setErp] = useState('')
  const [check, setCheck] = useState(true)
  const [error, setError] = useState('')

  const handleSubmit = async() => {
    setCheck(false)
    setError('')
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
    if(firstName == '' || lastName == ''){
      setCheck(true)
      setError('Name Required')
      return
    }
    if(erp == '' && !isTeacherMode) {
      setCheck(true)
      setError('ERP Required')
      return
    }
    try {
      let obj = {}
      if(isTeacherMode) {
        obj = {
          name: firstName + ' ' + lastName,
          email: email,
          password: password,
          role: 'teacher'
        }
      }
      else {
        obj = {
          name: firstName + ' ' + lastName,
          email: email,
          erp: erp,
          password: password,
          role: 'student'
        }
      }
      const response = await UserSignup({obj: obj});
      if (response.status == 200) {
        setCheck(true)
        window.location.assign('/login')
        console.log('Login successful:', response.data);
      } else {
        console.log('Login failed:', response.statusText);
      }
    } catch (error) { 
      if(error.response.status == 400) {
        setError('User Already Exists')
      }
      if(error.response.status == 500) {
        setError('Profile exists against a different role.')
      }
      setCheck(true)   
      console.log('Error:', error);
    }
  };

  return (
    <div className='w-full h-full md:h-screen font-body bg-LightBlue sm:overflow-y-auto'>
      <div className={`menu-container w-full h-14 bg-DarkBlue flex items-center `}>
        <div className='w-full'>
          <div className="menuleft logo flex justify-start">
            <img src={logo} className='w-44 h-14 mr-2'></img>
          </div>
        </div>
      </div>
      <div className='md:flex gap-4 p-8 h-fit overflow-x-hidden'>
            <div className='flex flex-col justify-end md:min-w-96'>
                <h1 className='font-bold text-center text-2xl md:text-left leading-relaxed'>Are you ready to take control of your learning journey?</h1>
                <h2 className='text-DarkBlue text-center text-3xl md:text-left font-semibold mt-8'>Register Now!</h2>
                <div className=' flex  flex-col  items-center  mt-8'>
                <img src={cover2} alt="" className='md:w-64  '/>
                </div>
            </div>  
            <div className='flex-auto border border-black p-4 rounded-lg max-md:mt-8'>
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
                    <div className='w-full flex items-center justify-center'>
                    <p className='text-red-600 mx-auto'>{error}</p>
                    </div>
                    <div className='w-full md:flex gap-4 mt-4'>
                      <input onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder= "First Name" type="text" className='max-md:mt-4 w-full border border-gray-200 rounded-lg p-2'/>
                      <input onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder= "Last Name" type="text" className='max-md:mt-4 w-full border border-gray-200  rounded-lg p-2'/>
                    </div>
                    <div className=''>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder= "Email" type="email" className='mt-4 w-full border  border-gray-200 rounded-lg p-2'/>
                    </div>
                    {
                      !isTeacherMode ?
                      <div>
                        <input onChange={(e) => setErp(e.target.value)} value={erp} placeholder= "ERP" type="text" className=' mt-4 w-full border border-gray-200 rounded-lg p-2'/>
                    </div>
                    :''
                    }
                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder= "Password" type="password" className='mt-4 w-full border border-gray-200 rounded-lg p-2'/>
                    </div>
                    <div className='flex flex-col items-center' >
                    <button onClick={check ? handleSubmit : ()=> {}} type="button"  className={`w-52 mt-8 mb-4 rounded-lg ${check ? 'bg-DarkBlue': 'bg-slate-500' } text-white text-sm py-4 self-center flex flex-col items-center`}>Signup</button>
                    </div>
                </form>
                <div className='flex items-center justify-center gap-2 self-center'>
                    <span className='text-xs'>Already have an Account </span>
                    <button onClick={()=>{window.location.assign('/login')}} className='text-xs text-[#2D79F3]'>Login</button>
                </div>
            </div>
      </div>
    </div>
  );
}

export default Signup;
