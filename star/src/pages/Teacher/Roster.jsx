import React, { useEffect, useState } from 'react';
import SideBar from '../../components/Teacher/SideBar';
import Subheader from '../../components/Teacher/Subheader';
import ActionBox from '../../components/Teacher/ActionBox';
import LMTable from '../../components/Teacher/LMTable';
import AddStudentDialog from '../../components/Teacher/AddStudentDialog';
import AddStudentManually from '../../components/Teacher/AddStudentManually';
import { BiChevronLeft } from 'react-icons/bi';
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { AddStudent, AddStudents, DeleteStudent, GetAllStudents } from '../../APIS/Teacher/SectionAPI';
import Loader from '../../components/Loader';
import {ClickOutsideFunc} from '../../components/ClickOutsideFunc';
import * as XLSX from "xlsx";
import { UpdateSection } from '../../APIS/Teacher/SectionAPI';
import { DeleteSection } from '../../APIS/Teacher/SectionAPI';
import ConfirmationBox from '../../components/ConfirmationBox';

const Roster = () => {
  let [profileDialog, setProfileDialog] = useState(false);
  let [deleteSection, setDeleteSection] = useState(false)

  let handleProfileClick = () => {
    setProfileDialog(true);
  };

  let closeProfile = ClickOutsideFunc(()=>{
    setProfileDialog(false);
  })
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true)
  const sectionId = useParams('sectionID')
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClass, setSelectedClass] = useState(localStorage.getItem('SelectedSection'));
  const [editedClassName, setEditedClassName] = useState(selectedClass);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingStudentManually, setIsAddingStudentManually] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [error , setError] = useState('');
  const [showError, setShowError] = useState(false);

  const columns = [
    { title: "Name", key: "name" },
    { title: "ID", key: "erp" },
    { title: "Email", key: "email" },
    { title: "Action", key: "action" },
  ];

  useEffect(()=>{
    const GetStudents = async() => {
      try{
        const res = await GetAllStudents({id: sectionId.sectionID})
        setTimeout(() => {
          setStudents(res)
          setLoading(false);
        }, 1000);
      } catch(err) {
        console.log(err)
      }
    }

    GetStudents()
  }, [])

  async function handleKeyPress(event) {
    if(editedClassName !== "") {
        if (event.key === 'Enter') {
          try {
            const res = await UpdateSection({id:sectionId.sectionID, name: editedClassName})
            setSelectedClass(editedClassName)
            console.log(res)
          } catch(err) {
              console.log(err)
          }
          setIsEditing(false);
        }
    }
}

  const handleDeleteSection = async() => {
    try {
      const res = DeleteSection({id: sectionId.sectionID})
      console.log(res)
      window.history.back()
    } catch(err) {
      console.log(err)
    }
  }

  const trimAndLowercaseKeys = (obj) => {
    const trimmedLowerCaseObj = {};
    Object.keys(obj).forEach((key) => {
      const trimmedKey = key.trim().toLowerCase();
      trimmedLowerCaseObj[trimmedKey] = obj[key];
    });
    return trimmedLowerCaseObj;
  };
  
  const handleexcelFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    setSelectedFile(e.target.files[0]); 
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const trimmedLowerCaseObj = trimAndLowercaseKeys(parsedData[0]);
      setData(parsedData);

      console.log(parsedData[0]);

      if(parsedData.length <2 ){
        setError('No data found in the file')
        setShowError(true)
        setSelectedFile(null);
        setData([]);
        return
      }
      else if(trimmedLowerCaseObj.name === undefined || trimmedLowerCaseObj.erp === undefined || trimmedLowerCaseObj.email === undefined){
        setError('Invalid file format. Column names should be name, erp, email')
        setShowError(true)
        setSelectedFile(null);
        setData([]);
        return
      }
      else{
        setError('')
        setShowError(false)
        console.log(parsedData)
      }
    };
  }

  const handleStudentDialogClose = () => {
    setIsAddingStudent(false);
    setError('')
    setShowError(false)
    setSelectedFile(null);
    setData([]);    
  };

  const handleimportFromExcel = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx'; // specify the file types allowed to be selected
    input.onchange = (e) => handleexcelFileUpload(e);

    input.click();
    setIsAddingStudentManually(false);
    setIsAddingStudent(true);
    setProfileDialog(false);
  }
  
  const handleimportManually = () => {
    setIsAddingStudent(false);
    setIsAddingStudentManually(true);
    setProfileDialog(false);
  }
  const handleAddStudent = async(student) => {
    try {
      const index = students.findIndex(item => item.id === student.erp);
      if(index == -1) {
        const addStudent = await AddStudent({sectionId: sectionId.sectionID, student: student})
        console.log(addStudent)
        student._id = addStudent.studentIds[0]
        setStudents([...students, student]);
      }
    } catch(err) {
      console.log(err)
    }
  };
  const handleAddStudents = async(newStudents) => {
    try {
      const filteredStudents = newStudents.filter(newStudent => !students.some(existingStudent => existingStudent.id === newStudent.id));
      if(filteredStudents.length > 0) {
        const addStudent = await AddStudents({sectionId: sectionId.sectionID, students: filteredStudents})
        filteredStudents.forEach((student, index)=>student._id = addStudent.studentIds[index])
        setStudents([...students, ...filteredStudents]);
      } 
    } catch(err) {
      console.log(err)  
    }
    setIsAddingStudent(false)
  };

  const handleDeleteStudent = async(index) => {
    try {
      const updatedStudents = [...students];
      const res = await DeleteStudent({sectionId: sectionId.sectionID, studentId: updatedStudents[index]._id})
      console.log(res)
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
      setDeleteSection(false)
    }  catch(err) {
      console.log(err)
    }
    
  };

  return (
    <>
        <SideBar active={"Classes"} />
        <div className='w-full flex flex-col'>
          <Subheader name={"Classes"} />
          <div className={`p-2 md:pl-4 md:pt-4 flex gap-4 ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
            {
              loading ? 
              <Loader/>
              :
              <>
                <div>
                <div className='w-full bg-LightBlue flex md:flex-row flex-col p-2 items-center justify-between shadow-md'>
                  <div className='flex items-center self-start'>
                    <button onClick={()=>{window.history.back()}}><BiChevronLeft className='text-3xl' /></button>
                    <div className='flex'>
                    {
                      isEditing ? 
                      (
                          <>                       
                              <input 
                                  autoFocus
                                  placeholder='Section'
                                  type='text' 
                                  value={editedClassName} 
                                  onChange={(e) => setEditedClassName(e.target.value)} 
                                  className='text-sm md:text-md ml-2 bg-LightBlue border-none outline-none'
                                  onKeyDown={handleKeyPress}
                              />
                          </>

                      ) 
                      : 
                      (
                          <>
                              <button onClick={() => setIsEditing(true)}><h1 className='text-sm md:text-md ml-2 font-body text-DarkBlue hover:underline'>{editedClassName}</h1></button>
                          </>
                      )
                    }
                </div>
                  </div>
                  <div className='flex items-center gap-2 sm:flex-row flex-col'>
                    <button onClick={()=>{setDeleteSection(true)}} className='flex bg-DarkBlue text-white active:shadow-md item-center justify-center gap-1 text-sm px-2 py-1 rounded-md'>
                      <MdOutlineDelete size={21} />
                      <p>Delete</p>
                    </button>
                    <button onClick={handleProfileClick} className='flex bg-DarkBlue text-white active:shadow-md item-center justify-center gap-1 text-sm px-2 py-1 rounded-md'>
                      <MdAdd size={21} />
                      <p>Add Student</p>
                    </button>
                    <div ref={closeProfile} className={`dialogue top-56 md:top-44 md:right-4 z-20 absolute rounded-md border-2  bg-LightBlue transition-all ease-out duration-500 ${profileDialog ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                      {profileDialog && (
                          <div className='h-20 dropdown-list w-36 md:w-48 flex flex-col items-center justify-around'>
                              <div className='h-8 w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white' onClick={()=>handleimportFromExcel()}>
                                  <button className=' ml-2'>Import from Excel</button>
                              </div>
                              
                              <div className='h-8 w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white' onClick={()=>handleimportManually()}>
                                  <button className='ml-2'>Add Manually</button>
                              </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
                <LMTable
                  data={students.map((student, index) => ({
                    ...student,
                    action: (
                      <ActionBox
                        onClickDelete={() => handleDeleteStudent(index)}
                      />
                    ),
                  }))}
                  columns={columns}
                />
                <AddStudentDialog isOpen={isAddingStudent} onClose={handleStudentDialogClose} selectedFilein={data} selectedFilename={selectedFile?.name}  EditClick = {handleimportFromExcel} sectionId = {sectionId} onSave={handleAddStudents} showError={showError} error={error}/>
                <AddStudentManually isOpen={isAddingStudentManually} onClose={() => {setIsAddingStudentManually(false)}} onSave={handleAddStudent} />
                </div>
              </>
            }
          </div>
        </div>
      {
          deleteSection ? 
          <ConfirmationBox message={`Confirm to delete section: ${selectedClass}`} onConfirm={handleDeleteSection} onCancel={()=>{setDeleteSection(false)}}/>
          : 
          ''
      }
    </>
  );
};

export default Roster;
