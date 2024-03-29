import React, {useEffect, useState} from 'react'
import MenuBar from '../../components/MenuBar';
import CourseCard from '../../components/Student/course/CourseCard';
import SubHeader from '../../components/Student/SubHeader';
import { GetEnrolledClasses } from '../../APIS/Student/ClassAPI';

const StudentCourses = () => {
    const [classes, setClasses] = useState([])
    let term = "Spring 2024"
    useEffect(()=> {
        const GetClasses = (async()=>{
            try {
                const res = await GetEnrolledClasses();
                console.log(res)
                const filteredRes = groupBySemester(res)
                console.log(filteredRes)
                setClasses(filteredRes)
            } catch(err) {
                console.log(err)
            }
        })

        GetClasses()
    }, [])

    function groupBySemester(data) {
        const groupedBySemester = {};

        data.forEach(obj => {
            const { SemesterName, ...rest } = obj;
            if (!groupedBySemester[SemesterName]) {
                groupedBySemester[SemesterName] = [];
            }

            groupedBySemester[SemesterName].push({ ...rest });
        });

        const result = Object.entries(groupedBySemester).map(([semester, values]) => ({
            semester,
            data: values
        }));
    
        return result;
    }

    
    return (
    <div className='flex flex-col mb-20'>
        <MenuBar name={"Maaz Shamim"} role={"Student"}/>
        <SubHeader isActive={"Courses"}/>
        {
            classes.map((Sem)=>{
                return (
                    <div className='pageContainer overflow-auto rounded-lg'>
                        <h1 className='font-[300] mt-5 ml-4 font-body'>{Sem.semester}</h1>
                        <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                        <div className="flexContainer flex flex-wrap justify-start mb-4 ml-4">
                            <div className='courseContainer w-10/12 flex flex-wrap gap-x-4 justify-start'>
                                {
                                    Sem.data.map((EnrolledClass)=>{
                                        return(
                                        <CourseCard Quiz_Count={EnrolledClass.AssessmentsConducted} Course_Title={EnrolledClass.ClassName}/>
                                    )})
                                }
                            </div>
                        </div>
                    </div>
            )})
        }
    </div>
    )
}

export default StudentCourses