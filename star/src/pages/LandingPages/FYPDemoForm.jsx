import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import circlebg from './circlebg.png';
import LoadingButton from '../../components/button/LoadingButton';
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')

    const headings = [
        "Switch to an Education Platform You can rely on",
        "Transform learning with detailed assessment result analytics",
        "Keep track of student progress in real-time with live monitoring",
        "Data-driven insights for smarter education decisions."
    ];

    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear()
    }, []);

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
        setSelectedRole(event.target.value);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegisteration = async () => {
        if(name == '') {
            setError('Enter Your Name')
            return
        }
        if(email == '' || !validateEmail(email)) {
            setError('Enter valid Email')
            return
        }
        if(selectedRole == '') {
            setError('Select your role')
            return
        }
        setError('')
        try {
            const req = await DemoAssessmentEnrollment({ name: name, email: email, role: selectedRole });
            const res = req.data;
            const userDetails = {
                name: name,
                email: email,
                role: selectedRole
            };
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
            localStorage.setItem('responseId', res.responseId);
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
            };
            const questionSet = [...res.questions]
            if(obj.quizConfig.randomizeQuestions) {
                for (let i = questionSet.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [questionSet[i], questionSet[j]] = [questionSet[j], questionSet[i]];
                }
            }

            if(obj.quizConfig.randomizeAnswers) {
                const shuffledQuestionSet = questionSet.map((question) => {
                const options = [...question.options]; 
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }
                return { ...question, options };
                });
                localStorage.setItem('questions', JSON.stringify(encryptData(shuffledQuestionSet, 'Arete1234')));
            }
            else {
                localStorage.setItem('questions', JSON.stringify(encryptData(questionSet, 'Arete1234')));
            }
            localStorage.setItem('quizDetails', JSON.stringify(obj));
            window.location.assign('/fyp-demo');
        } catch (err) {
            setError('Unexpected Error. Please try again.')
            console.log(err);
        }
    };

    return (
        <div className="w-full min-h-screen font-body bg-DarkBlue flex flex-col items-center">
            <div className="self-start">
                <img className="w-32" src={logo} alt="Logo" />
            </div>
            <div className="z-20 flex justify-center h-36 text-center text-3xl md:text-5xl font-bold text-white mt-8">
                <h1 className={`md:w-3/5 max-md:px-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                    {headings[headingIndex]}
                </h1>
            </div>
            <img src={circlebg} alt="Background Circle" className="z-0 absolute md:right-44 top-36 right-8" />
            <div className="z-30 flex justify-center w-full p-4 rounded-xl mt-4 slide-in">
                <div className="bg-LightBlue w-full md:w-1/2 rounded-lg md:p-4">
                    <div className="p-4">
                        <label className="text-md font-semibold">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Your Name"
                            className="rounded-lg text-sm h-fit w-full my-2 py-4 px-2"
                        />
                    </div>
                    <div className="p-4">
                        <label className="text-md font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="rounded-lg text-sm h-fit w-full my-2 py-4 px-2"
                        />
                    </div>
                    <div className="p-4">
                        <label className="text-md font-semibold">Role</label>
                        <select
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="rounded-lg text-sm h-fit w-full my-2 py-4 px-2"
                        >
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="alumni">Alumni</option>
                            <option value="expert">Industry Expert</option>
                        </select>
                    </div>
                    <div className="flex justify-center mb-4 text-red-500 text-sm">
                        <p>{error}</p>
                    </div>
                    <div className="flex justify-center mb-4">
                        <LoadingButton type="submit" active={true} label={"Attempt an assessment"} onClick={handleRegisteration} />
                    </div>
                </div>
            </div>
            <img src={circlebg} alt="Background Circle" className="z-0 absolute bottom-24 left-20 w-24" />
        </div>
    );
};

export default LandingPage;
