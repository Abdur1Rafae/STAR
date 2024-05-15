import AssessmentCard from '../../components/Teacher/AssessmentCard';
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import React ,{ useState, useEffect }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import { GetAssessments } from '../../APIS/Teacher/AssessmentAPI';
import Loader from '../../components/Loader';

function ScheduledAssessment() {
    const [loading, setLoading] = useState(true)
    const [assessments, setAssessments] = useState([])
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [classes, setClasses] = useState([]);
    const statuses = ['All', 'In Progress', 'Requires Review', 'Not Started'];
    const [filteredAssesments, setFilteredAssessments] = useState([])

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
    
    const handleDeleteAsessment = ({ id }) => {
        const index = assessments.findIndex((assessment) => assessment._id === id);
        if (index !== -1) {
            const updatedAssessments = [...assessments];
            updatedAssessments.splice(index, 1);
            setAssessments(updatedAssessments);
        } else {
            console.log('Assessment not found');
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
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
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
                                    <p className='sm:text-md md:text-lg font-normal text-gray-400 ml-2 h-full mt-1' >{assessments.length} in total</p>
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
                                        return <AssessmentCard key={assessment._id} assessment={assessment} onDelete={()=>handleDeleteAsessment({id:assessment._id})} />
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default ScheduledAssessment;
