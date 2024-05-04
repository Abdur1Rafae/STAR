import React, {useEffect, useState} from 'react'
import MenuBar from '../../components/MenuBar';
import CourseCard from '../../components/Student/course/CourseCard';
import SubHeader from '../../components/Student/SubHeader';
import { GetEnrolledClasses } from '../../APIS/Student/ClassAPI';

const StudentCourses = () => {
    const [classes, setClasses] = useState([])
    useEffect(()=> {
        const GetClasses = (async()=>{
            try {
                const res = await GetEnrolledClasses();
                console.log(res)
                setClasses(res)
            } catch(err) {
                console.log(err)
            }
        })

        GetClasses()
    }, [])

    
    return (
    <div className='flex flex-col mb-20'>
        <MenuBar name={"Maaz Shamim"} role={"Student"}/>
        <SubHeader isActive={"Courses"}/>
        {
            classes.length > 0 ?
            (classes.map((Sem)=>{
                return (
                    <div className='pageContainer overflow-auto rounded-lg'>
                        <h1 className='font-[300] mt-5 ml-4 font-body'>{}</h1>
                        <div className='border-b-[1px] border-[#937D7D] ml-4 mr-4'></div>
                        <div className="flexContainer flex flex-wrap justify-start mb-4 ml-4">
                            <div className='courseContainer w-10/12 flex flex-wrap gap-x-4 justify-start'>
                                {
                                    <CourseCard classInfo= {Sem}/>
                                }
                            </div>
                        </div>
                    </div>
            )}))
            :
            <p className='ml-4 mt-4'>Not enrolled in any classes yet.</p>
        }
    </div>
    )
}

export default StudentCourses