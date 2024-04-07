import React, { useState } from 'react';
import SubmitButton from '../button/SubmitButton'

const AddStudentDialog = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    onSave({ name, id, email });
    setName('');
    setId('');
    setEmail('');
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
        <input type="text" placeholder="Name" value={name}  onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
        <input type="text" placeholder="ID" value={id}  onChange={(e) => setId(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
        <input type="email" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
        <SubmitButton label={"Add from Excel/CSV"} active={true}/>
        
        <div className="flex justify-end gap-2">
          <SubmitButton label={"Cancel"} onClick={onClose} />
          <SubmitButton label={"Save"} onClick={handleSave} active={true}/>
        </div>
      </div>
    </div>
  );
};

export default AddStudentDialog;
