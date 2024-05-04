import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const AccountForm = () => {
  const [formData, setFormData] = useState({
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    studentId: '123456',
    currentPassword: 'mypassword',
    newPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className='flex md:flex-row flex-col pb-4 gap-4 md:w-8/12'>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>First Name</span>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"

          />
        </div>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>Last Name</span>
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
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
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>
        <div className='h-16 w-full border bg-blue-50 rounded-md shadow-md flex flex-col'>
          <span className='pl-2 pt-2 text-xs font-light'>Student ID</span>
          <input
            type="text"
            value={formData.studentId}
            name="studentId"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
        </div>
      </div>

      <div className='h-16 w-full md:w-8/12 border bg-blue-50 rounded-md shadow-md flex flex-col mb-4'>
        <span className='pl-2 pt-2 text-xs font-light'>Password</span>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.currentPassword}
            name="currentPassword"
            onChange={handleChange}
            className="pl-2 outline-none focus:outline-none bg-blue-50"
          />
          <div
            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer pr-2"
            onClick={handlePasswordToggle}
          >
            {showPassword ? (
              <FaRegEyeSlash size={20} color="#2C6491" />
            ) : (
              <FaRegEye size={20} color="#2C6491" />
            )}
          </div>
        </div>
      </div>
      <div className='h-16 w-full md:w-8/12 border bg-blue-50 rounded-md shadow-md flex flex-col mb-4'>
        <span className='pl-2 pt-2 text-xs font-light'>Confirm Password</span>
        <input
          type="password"
          value={formData.newPassword}
          name="newPassword"
          onChange={handleChange}
          className="pl-2 outline-none focus:outline-none bg-blue-50"
        />
        
      </div>
    </div>
  );
};

export default AccountForm;
