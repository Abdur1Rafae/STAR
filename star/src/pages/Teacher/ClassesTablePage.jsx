import React, { useState } from 'react';
import MenuBar from '../../components/MenuBar';
import SideBar from '../../components/Teacher/SideBar';
import Subheader from '../../components/Teacher/Subheader';
import LCSearchBar from '../../components/Teacher/LCSearchBar';
import ActionBox from '../../components/Teacher/ActionBox';
import LMTable from '../../components/Teacher/LMTable';
import AddStudentDialog from '../../components/Teacher/AddStudentDialog'; // Import the AddStudentDialog component
import { BiChevronLeft } from 'react-icons/bi';
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const ClassesTablePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedClassName, setEditedClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState('5046 (11:30AM - 12:45PM)');
  const [previousClassName, setPreviousClassName] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [students, setStudents] = useState([
    { 'name': 'Maaz Shamim', 'erp': '22131', 'email': "asd@asdas.com" },
  ]);

  // Define columns for the LMTable component
  const columns = [
    { title: "Name", key: "name" },
    { title: "Student ID", key: "erp" },
    { title: "Email", key: "email" },
    { title: "Action", key: "action" },
  ];

  // Function to handle editing class name
  const handleEditClassName = () => {
    console.log('Class name edited:', editedClassName);
    setSelectedClass(editedClassName);
    setIsEditing(false);
  };

  // Function to handle canceling edit mode
  const cancelEditClassName = () => {
    setIsEditing(false);
    setEditedClassName(previousClassName);
  };

  // Function to handle adding a new student
  const handleAddStudent = (student) => {
    setStudents([...students, student]);
  };

  // Function to handle deleting a student
  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  // Function to handle editing a student
  const handleEditStudent = (index) => {
    console.log('Edit student:', students[index]);
    // Implement logic to open a dialog box with pre-filled student details for editing
  };

  return (
    <div className='w-full h-full font-body border border-black'>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"} />
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
        <SideBar active={"Classes"} />
        <div className='h-fit w-full'>
          <Subheader name={"Classes"} />
          <div className='md:p-4 p-2'>
          <div className='w-full bg-LightBlue flex md:flex-row flex-col p-2 items-center justify-between shadow-md'>
            <div className='flex items-center self-start'>
              <BiChevronLeft className='text-3xl' />
              {isEditing ? (
                <input
                  type="text"
                  value={editedClassName}
                  className='border border-black w-40'
                  onChange={(e) => setEditedClassName(e.target.value)}
                />
              ) : (
                <h4 className='font-semibold'>{selectedClass}</h4>
              )}
              {!isEditing && <MdOutlineModeEdit className='ml-2' onClick={() => {
                setIsEditing(true);
                setPreviousClassName(selectedClass);
              }} />}
              {isEditing && (
                <>
                  <button className='text-sm bg-DarkBlue text-white rounded-md m-2 py-1 px-2' onClick={handleEditClassName}>Save</button>
                  <button className='text-sm bg-DarkBlue text-white rounded-md py-1 px-2' onClick={cancelEditClassName}>Cancel</button>
                </>
              )}
            </div>
            <div className='flex items-center gap-2 sm:flex-row flex-col'>
              <button className='flex bg-DarkBlue text-white active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md'>
                <MdOutlineDelete size={21} />
                Delete
              </button>
              <button className='flex bg-DarkBlue text-white active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md' onClick={() => setIsAddingStudent(true)}>
                <IoIosAddCircle size={21} />
                Add Student
              </button>
            </div>
          </div>
          <div className='mt-4'>
            <LCSearchBar />
          </div>
          <LMTable
            data={students.map((student, index) => ({
              ...student,
              action: (
                <ActionBox
                  onClickEdit={() => handleEditStudent(index)}
                  onClickDelete={() => handleDeleteStudent(index)}
                />
              ),
            }))}
            columns={columns}
          />
          <AddStudentDialog isOpen={isAddingStudent} onClose={() => setIsAddingStudent(false)} onSave={handleAddStudent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesTablePage;
