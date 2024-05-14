import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdModeEdit } from "react-icons/md";

const AccountForm = () => {
  let user = JSON.parse(localStorage.getItem('userDetails'));
  let email =localStorage.getItem('userEmail');
  console.log(user);
  const [formData, setFormData] = useState({
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    studentId: '123456',
    currentPassword: 'mypassword',
    newPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleDialogToggle = () => {
    setShowDialog(!showDialog);
  };
  const handleDialogSave = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div>
      <div className='flex md:flex-row flex-col pb-4 gap-4 md:w-8/12'>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>First Name</span>
          <input
            type="text"
            value={user.name}
            name="name"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>
        
      </div>
      <div className='flex md:flex-row flex-col pb-4 gap-4 md:w-8/12'>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>Email</span>
          <input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>
        { user.role === 'student' &&
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>Student ID</span>
          <input
            type="text"
            value={formData.studentId}
            name="studentId"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>}
      </div>
      <div className='flex gap-2 items-center mb-4'>
        <button className='bg-DarkBlue text-white rounded-lg shadow-lg px-4 py-2' onClick={handleDialogToggle}>Change Password</button>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <div>
              <div className='flex items-center justify-center rounded-lg bg-blue-50 p-4 mb-4'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="Current Password"
              onChange={handleChange}
              placeholder="Current Password"
              className="  outline-none focus:outline-none bg-blue-50"
            />
            <div  onClick={handlePasswordToggle}>
            
            {showPassword ? (
                <FaRegEyeSlash size={20} color="#2C6491" />
              ) : (
                <FaRegEye size={20} color="#2C6491" />
              )}
            </div>
            </div>
            <div className='flex items-center justify-center rounded-lg bg-blue-50 p-4 mb-4'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              name="newPassword"
              onChange={handleChange}
              placeholder="New Password"
              className=" outline-none focus:outline-none bg-blue-50 "
            />
            <div  onClick={handlePasswordToggle}>
            {showPassword ? (
                <FaRegEyeSlash size={20} color="#2C6491" />
              ) : (
                <FaRegEye size={20} color="#2C6491" />
              )}
              </div>
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
