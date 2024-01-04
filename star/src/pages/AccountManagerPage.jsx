// pages/AccountManagerPage.jsx
import React from 'react';
import { useMatch } from 'react-router-dom';
import AccountForm from '../components/AccountForm';

const AccountManagerPage = () => {
  const match = useMatch('/manage-account');
  if (!match) {
    return null; // or render some error message
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full">
        <div className="bg-white p-8 shadow-md rounded-md">
          <h1 className="text-3xl font-semibold mb-6">Manage Your Account</h1>
          <AccountForm />
        </div>
      </div>
    </div>
  );
};

export default AccountManagerPage;
