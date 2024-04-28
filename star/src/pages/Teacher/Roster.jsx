import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { AddStudent, DeleteStudent, GetAllStudents } from '../../APIS/Teacher/SectionAPI';
import SubmitButton from '../../components/button/SubmitButton';
import Loader from '../../components/Loader';

const Roster = () => {
  const [loading, setLoading] = useState(true)
  const sectionId = useParams('sectionID')
  const [isEditing, setIsEditing] = useState(false);

  const [editedClassName, setEditedClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState(localStorage.getItem('SelectedSection'));
  const [previousClassName, setPreviousClassName] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [students, setStudents] = useState([]);


  async function handleKeyPress(event) {
    if (event.key === 'Enter') {
        try {
            const res = await UpdateClass({id: sectionId.sectionID, name: newClass})
            setClassName(newClass);
            setIsEditing(false);
        } catch(err) {
            console.log(err)
        }
    }
}


let saveClassName = ClickOutsideFunc(()=>{
  setIsEditing(false);
})


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

  const handleAddStudent = async(student) => {
    try {
      const addStudent = await AddStudent({sectionId: sectionId.sectionID, student: student})
      student._id = addStudent.studentIds[0]
      setStudents([...students, student]);
    } catch(err) {
      console.log(err)
    }
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
                        onClickDelete={() => handleDeleteStudent(index)}
                      />
                    ),
                  }))}
                  columns={columns}
                />
                <AddStudentDialog isOpen={isAddingStudent} onClose={() => setIsAddingStudent(false)} onSave={handleAddStudent} />
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
