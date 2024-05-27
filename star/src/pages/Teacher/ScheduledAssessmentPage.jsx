import AssessmentCard from '../../components/Teacher/AssessmentCard';
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import React ,{ useState, useEffect }from 'react';
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import { GetAssessments } from '../../APIS/Teacher/AssessmentAPI';
import Loader from '../../components/Loader';
import { MdClose } from 'react-icons/md';
import SubmitButton from '../../components/button/SubmitButton';
import { DeleteAssessment } from '../../APIS/Teacher/AssessmentAPI';

function ScheduledAssessment() {
    const [loading, setLoading] = useState(true)
    const [assessments, setAssessments] = useState([])
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [classes, setClasses] = useState([]);
    const statuses = ['All', 'In Progress', 'Requires Review', 'Not Started'];
    const [filteredAssesments, setFilteredAssessments] = useState([])
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [IdToDelete, setIdToDelete] = useState('')

    useEffect(()=> {
        const data = assessments.filter((assessment) => {
            if(selectedClass !== 'All'  && assessment.className != selectedClass) {
                return false;
            }
            if(selectedStatus!== 'All' && assessment.category != selectedStatus) {
                return false;
            }
            return true
        })

        setFilteredAssessments(data)
    }, [assessments, selectedClass, selectedStatus])


    const handleSelectClass = (category) => {
        setSelectedClass(category);
    };

    const handleSelectStatus = (category) => {
        setSelectedStatus(category);
    };
    
    const handleDeleteAsessment = async({ id }) => {
        try {
            const res = await DeleteAssessment({id: id})
            console.log(res)
            const index = assessments.findIndex((assessment) => assessment._id === id);
            if (index !== -1) {
                const updatedAssessments = [...assessments];
                updatedAssessments.splice(index, 1);
                setAssessments(updatedAssessments);
            } else {
                console.log('Assessment not found');
            }
        } catch(err) {
            console.log(err)
        }
    };

    useEffect(()=> {
        const getAssessments = async () => {
            try {
                const res = await GetAssessments();
                setTimeout(() => {
                    setAssessments(res);
                    console.log(res)
                    const classes = ['All',...new Set(res.filter((asg => asg.hasOwnProperty('className'))).map(asg => asg.className))]
                    setClasses(classes)
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.log(err);
            }
        };

        getAssessments()
    }, [])

    const handleDelete = () => {

    }

  return (
    <>
            <SideBar active={"Home"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Dashboard"} button={"New Assessment"} onClick={()=>{window.location.assign('/teacher/create-new-assessment')}}/>
                <div className={`p-2 md:pl-4 md:pt-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
                    {
                        loading ? 
                        <Loader/>
                        :
                        <>
                            <div className='md:flex items-center justify-between'>
                                <div className='flex items-center font-body'>
                                    <h1 className='sm:text-xl md:text-2xl font-medium border-r-2 border-black pr-2'>All Assessments </h1>
                                    <p className='sm:text-md md:text-lg font-normal text-gray-400 ml-2 h-full mt-1' >{filteredAssesments.length} in total</p>
                                </div>
                                <div className= 'flex gap-4 mt-4 md:mt-0'>
                                    <p className='text-sm self-center font-normal font-body text-gray-400 h-full' >Filter by:</p>
                                    <CategoryFilter
                                            categories={classes}
                                            selectedCategory={selectedClass}
                                            onSelectCategory={handleSelectClass}
                                        /> 
                                    <CategoryFilter
                                        categories={statuses}
                                        selectedCategory={selectedStatus}
                                        onSelectCategory={handleSelectStatus}
                                    /> 
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-6'>
                                {
                                    filteredAssesments.map((assessment, index)=> {
                                        return <AssessmentCard key={assessment._id} assessment={assessment} onDelete={()=>{setIdToDelete(assessment._id); setConfirmDelete(true)}} />
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                {
                    confirmDelete &&
                    <div className="fixed mx-auto my-auto bg-opacity-50 inset-0 flex items-center justify-center w-full h-full bg-black font-body">
                        <div className='flex flex-col w-full mx-2 md:mx-0 md:w-1/2 bg-LightBlue overflow-y-auto'>
                            <div className='bg-DarkBlue text-white h-8 w-full px-2 flex items-center justify-between'>
                                <p>Publishing Grades</p>
                                <button onClick={()=>setConfirmDelete(false)}><MdClose/></button>
                            </div>
                            <div className='p-2'>
                                <p className='text-md'>Are you sure you wish to delete the assessment?</p>
                                <p className='text-sm font-bold mt-2'>This action cannot be undone!</p>
                                <div className='flex justify-center mt-4'>
                                <SubmitButton label={'Delete'} active={true} onClick={()=>{handleDeleteAsessment({id:IdToDelete}); setConfirmDelete(false)}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
  );
}

export default ScheduledAssessment;
