import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/MenuBar';
import SideBar from '../../components/Teacher/SideBar';
import Subheader from '../../components/Teacher/Subheader';
import LCSearchBar from '../../components/Teacher/LCSearchBar';
import ActionBox from '../../components/Teacher/ActionBox';
import LMTable from '../../components/Teacher/LMTable';
import AddStudentDialog from '../../components/Teacher/AddStudentDialog'; // Import the AddStudentDialog component
import AddStudentManually from '../../components/Teacher/AddStudentManually'; // Import the AddStudentManually component
import { BiChevronLeft } from 'react-icons/bi';
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { AddStudent,AddStudents, DeleteStudent, GetAllStudents } from '../../APIS/Teacher/SectionAPI';
import SubmitButton from '../../components/button/SubmitButton';
import Loader from '../../components/Loader';
import {ClickOutsideFunc} from '../../components/ClickOutsideFunc';
import * as XLSX from "xlsx";

const Roster = () => {
  let [profileDialog, setProfileDialog] = useState(false);

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
  const [editedClassName, setEditedClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState(localStorage.getItem('SelectedSection'));
  const [previousClassName, setPreviousClassName] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingStudentManually, setIsAddingStudentManually] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditingStudent, setIsEditingStudent] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
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

  const handleEditClassName = () => {
    console.log('Class name edited:', editedClassName);
    setSelectedClass(editedClassName);
    setIsEditing(false);
  };

  const cancelEditClassName = () => {
    setIsEditing(false);
    setEditedClassName(previousClassName);
  };

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
      const addStudent = await AddStudent({sectionId: sectionId.sectionID, student: student})
      student._id = addStudent.studentIds[0]
      setStudents([...students, student]);
    } catch(err) {
      console.log(err)
    }
  };
  const handleAddStudents = async(students) => {
    console.log(students)
    try {
      const addStudent = await AddStudents({sectionId: sectionId.sectionID, students: students})
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
    }  catch(err) {
      console.log(err)
    }
    
  };

  const handleEditStudent = (index, student) => {
    setIsEditingStudent(true)
    setSelectedStudent(student)
  };

  const handleEditStudentSave = (editedStudent) => {
    const updatedStudents = [...students];
    const index = updatedStudents.findIndex(student => student._id === selectedStudent._id);
    if (index !== -1) {
      const newStudent = {...updatedStudents[index]}
      newStudent.name = editedStudent.name;
      newStudent.erp = editedStudent.erp
      newStudent.email = editedStudent.email
      updatedStudents[index] = newStudent
      setStudents(updatedStudents);
    }
    setIsEditing(false);
  }

  return (
    <div className='flex flex-col h-screen'>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"} />
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
        <SideBar active={"Classes"} />
        <div className='w-full flex flex-col'>
          <Subheader name={"Classes"} />
          <div className={`p-2 md:pl-4 md:pt-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
            {
              loading ? 
              <Loader/>
              :
              <>
                <div className='w-full bg-LightBlue flex md:flex-row flex-col p-2 items-center justify-between shadow-md'>
                  <div className='flex items-center self-start'>
                    <button onClick={()=>{window.location.assign('/teacher/classes')}}><BiChevronLeft className='text-3xl' /></button>
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
                    <button onClick={handleProfileClick} className='flex bg-DarkBlue text-white active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md'>
                      <MdOutlineDelete size={21} />
                      Add Student
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
                <div className='mt-4'>
                  <LCSearchBar />
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
                <AddStudentManually isOpen={isAddingStudentManually} onClose={() => setIsAddingStudentManually(false)} onSave={handleAddStudent} />
                {
                  isEditingStudent ?
                  <EditingStudentDialogBox isOpen={isEditingStudent} onClose={()=> setIsEditingStudent(false)} oldName={selectedStudent.name} oldEmail={selectedStudent.email} oldErp={selectedStudent.erp} onSave={handleEditStudentSave}/>
                  : ''
                }
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const EditingStudentDialogBox = ({isOpen, oldName, oldEmail, oldErp, onSave, onClose}) => {
  const [name, setName] = useState(oldName);
  const [erp, setErp] = useState(oldErp);
  const [email, setEmail] = useState(oldEmail);

  const handleSave = () => {
    onSave({ name, erp, email });
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Editing Student</h2>
        <input type="text" placeholder="Name" value={name}  onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
        <input type="text" placeholder="ID" value={erp}  onChange={(e) => setErp(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-2 w-full" />
        <input type="email" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
        <SubmitButton label={"Add from Excel/CSV"} active={true}/>
        
        <div className="flex justify-end gap-2">
          <SubmitButton label={"Cancel"} onClick={onClose} />
          <SubmitButton label={"Save"} onClick={handleSave} active={true}/>
        </div>
      </div>
    </div>
  );
}

export default Roster;
