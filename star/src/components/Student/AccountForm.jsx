import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { UpdateProfile } from '../../APIS/AuthAPI';

const AccountForm = () => {
  let user = JSON.parse(sessionStorage.getItem('userDetails'));
  let email =sessionStorage.getItem('userEmail');
  const [formData, setFormData] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPassword, SetCurrentPassword] = useState('')
  const [newPassword, SetNewPassword] = useState('')

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleDialogToggle = () => {
    setShowDialog(!showDialog);
  };
  const handleDialogSave = async() => {
    try {
      const res = await UpdateProfile({name: user.name, newPass: newPassword, currPass: currentPassword})
      console.log(res)
    } catch(err) {
      console.log(err)
    }
    setShowDialog(false);
  };

  return (
    <div>
      <div className='flex md:flex-row flex-col pb-4 gap-4 md:w-8/12'>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>First Name</span>
          <input
          readOnly
            type="text"
            value={user.name}
            name="name"
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>
        
      </div>
      <div className='flex md:flex-row flex-col pb-4 gap-4 md:w-8/12'>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>Email</span>
          <input
          readOnly
            type="email"
            value={email}
            name="email"
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>
        { user.role === 'student' &&
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>Student ID</span>
          <input
          readOnly
            type="text"
            value={user.erp}
            name="studentId"
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>}
      </div>
      <div className='flex gap-2 items-center mb-4'>
        <button className='bg-DarkBlue text-white rounded-lg shadow-lg px-4 py-2' onClick={handleDialogToggle}>Change Password</button>
      </div>

      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-md w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <div className=''>
              <div className='w-full flex items-center justify-center rounded-lg bg-blue-50 p-4 mb-4'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="Current Password"
                  onChange={(e)=> SetCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  className="  outline-none focus:outline-none bg-blue-50 w-full mr-4"
                />
                <button  onClick={handlePasswordToggle}>
                
                {showPassword ? (
                    <FaRegEyeSlash size={20} color="#2C6491" />
                  ) : (
                    <FaRegEye size={20} color="#2C6491" />
                  )}
                </button>
              </div>
              <div className='flex items-center justify-center rounded-lg bg-blue-50 p-4 mb-4'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  name="newPassword"
                  onChange={(e)=> SetNewPassword(e.target.value)}
                  placeholder="New Password"
                  className=" outline-none focus:outline-none bg-blue-50 w-full mr-4"
                />
                  <button  onClick={handlePasswordToggle}>
                    {showPassword ? (
                        <FaRegEyeSlash size={20} color="#2C6491" />
                      ) : (
                        <FaRegEye size={20} color="#2C6491" />
                      )}
                  </button>
              </div>
            </div>
            <div className='flex gap-2 justify-end'>
              <button className='bg-gray-400 text-white rounded-lg shadow-lg px-4 py-2' onClick={handleDialogToggle}>Cancel</button>
              <button className='bg-DarkBlue text-white rounded-lg shadow-lg px-4 py-2 ' onClick={handleDialogSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountForm;
