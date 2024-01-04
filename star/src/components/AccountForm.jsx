// AccountForm.js
import React, { useState } from 'react';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

import '../index.css'; // Import the CSS file

const AccountForm = () => {
  const [formData, setFormData] = useState({
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    studentId: '123456',
    currentPassword: '********',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium">Account Details</p>
          <p className="text-sm text-gray-600">Edit your account details</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <div className="flex flex-col w-full">
          <label className="shrink-0 w-32 font-medium">Name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="shrink-0 w-32 font-medium">Last Name</label>
          <input
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <div className="flex flex-col w-full">
          <label className="shrink-0 w-32 font-medium">Student ID</label>
          <input
            value={formData.studentId}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
        
      </div>
      <div className="flex flex-col w-full">
          <label className="shrink-0 w-32 font-medium">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <div className="flex flex-col w-full">
          <label className="shrink-0 w-32 font-medium">Current Password</label>
          <input
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <div className="flex flex-col w-full">
          <label className="shrink-0 w-32 font-medium">New Password</label>
          <input
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
      <CancelButton onClick={() => console.log('Cancel Clicked')}>Cancel</CancelButton>

        <SubmitButton>Save Changes</SubmitButton>
      </div>
    </div>
  );
};

export default AccountForm;
