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
    const [selectedCategory, setSelectedCategory] = useState('');
    const classes = ['All', 'Technology', 'Science', 'Art', 'Sports'];
    const statuses = ['All', 'In Progress', 'Requires Grading', 'Not Started'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    useEffect(()=> {
        const getAssessments = async () => {
            try {
                const res = await GetAssessments();
                setTimeout(() => {
                    setAssessments(res);
                    console.log(res)
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
                <SubheaderBut name={"Dashboard"} button={"Assessment"} onClick={()=>{window.location.assign('/teacher/create-new-assessment')}}/>
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
                                            categoryName="Class"
                                            categories={classes}
                                            selectedCategory={selectedCategory}
                                            onSelectCategory={handleSelectCategory}
                                        /> 
                                    <CategoryFilter
                                        categoryName="Status"
                                        categories={statuses}
                                        selectedCategory={selectedCategory}
                                        onSelectCategory={handleSelectCategory}
                                    /> 
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-6'>
                                {
                                    assessments.map((assessment, index)=> {
                                        return <AssessmentCard key={assessment._id} assessment={assessment} />
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
