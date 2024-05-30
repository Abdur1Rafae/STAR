import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import circlebg from './circlebg.png';
import SubmitButton from '../../components/button/SubmitButton';
import { DemoAssessmentEnrollment } from '../../APIS/AuthAPI';
import CryptoJS from 'crypto-js';


const encryptData = (data, key) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return encrypted;
  };

const LandingPage = () => {
    const [selectedRole, setSelectedRole] = useState('student');
    const [headingIndex, setHeadingIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const headings = [
        "Switch to an Education Platform You can rely on",
        "Transform learning with detailed assessment result analytics",
        "Keep track of student progress in real-time with live monitoring",
        "Data-driven insights for smarter education decisions."
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setHeadingIndex(prevIndex => (prevIndex + 1) % headings.length);
                setFadeIn(true);
            }, 500); // Duration of the fade-out effect
        }, 3000); // Change the interval time (in milliseconds) as needed

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const handleRoleChange = (event) => {
        console.log(event.target.value)
        setSelectedRole(event.target.value);
    };

    const handleRegisteration = async() => {
        try {
            const req = await DemoAssessmentEnrollment({name: name, email: email, role: selectedRole})
            const res = req.data
            const userDetails = {
                name: name,
                email: email,
                role: selectedRole
            }
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails))
            localStorage.setItem('responseId', res.responseId)
            const obj = {
                duration: res.configurations.duration,
                closeDate: res.configurations.closeDate,
                title: res.title,
                marks: res.totalMarks,
                teacher: 'Jawwad Ahemd Farid',
                sectionId: 'fyp',
                id: 'fyp',
                description: '',
                className: 'fyp',
                quizConfig: {
                    adaptiveTesting: res.configurations.adaptiveTesting,
                    finalScore: res.configurations.finalScore,
                    instantFeedback: res.configurations.instantFeedback,
                    monitoring: res.configurations.monitoring,
                    navigation: res.configurations.monitoring,
                    randomizeQuestions: res.configurations.randomizeQuestions,
                    randomizeAnswers: res.configurations.randomizeAnswers,
                    releaseGrades: res.configurations.releaseGrades,
                    viewSubmissions: res.configurations.viewSubmissions
                }
            }
            localStorage.setItem('quizDetails', JSON.stringify(obj))
            localStorage.setItem('questions', JSON.stringify(encryptData(res.questions, 'Arete1234')));
            console.log(res)
            window.location.assign('/fyp-demo')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='w-full h-screen md:h-full scroll-smooth font-Poppins bg-DarkBlue'>
            <div className=''>
                <img className='w-32' src={logo} alt="" />
            </div>
            <div className='flex justify-center h-36 text-center text-3xl md:text-5xl font-bold text-white '>
                <h1 className={`md:w-3/5 max-md:px-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                    {headings[headingIndex]}
                </h1>
            </div>
            <img src={circlebg} alt=""  className='z-0 absolute md:right-64 right-8 '/>
            <div className='flex justify-center w-full p-4 rounded-xl mt-4'>
                <div className='z-10 bg-LightBlue w-full md:w-1/2 rounded-lg md:p-4' >
                    
                        <div className='p-4'>
                        <label className='text-md font-semibold'>Name</label>
                        <input 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type="text" 
                        placeholder='Your Name' 
                        className='rounded-lg text-sm h-fit w-full my-2 py-4 px-2'
                        />
                        </div>
                        
                    <div className='p-4'>
                    <label className='text-md font-semibold'>Email</label>
                    <input 
                    type="email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Your Email' 
                    className='rounded-lg text-sm h-fit w-full my-2 py-4 px-2'
                    />
                    </div>
                    <div className='p-4'>
                        
            <label className='text-md font-semibold' >Role</label>
            <select value={selectedRole} onChange={handleRoleChange}  className='rounded-lg text-sm h-fit w-full my-2 py-4 px-2'
>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="alumni">Alumnnus</option>
                <option value={"expert"}>Industry Expert</option>
            </select>
                    </div>
                    <div className='flex justify-center'>
                    <SubmitButton type='submit' active={true} label={"Attempt an assessment"} onClick={handleRegisteration}/>
                    </div>
                </div>
            </div>
            <img src={circlebg} alt=""  className='z-0 absolute bottom-24 left-20 w-24'/>

        </div>
    );
};

export default LandingPage;
