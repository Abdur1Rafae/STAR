import React, { useState, useEffect } from 'react';
import logo from '../../components/logo.png';
import circlebg from './circlebg.png';

const LandingPage = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [headingIndex, setHeadingIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    const headings = [
        "Switch to a Education Platform You can rely on",
        "Transform learning with detailed quiz result analytics",
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

    const toggleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    return (
        <div className='w-full h-screen md:h-fit scroll-smooth font-Poppins bg-DarkBlue'>
            <div className='p-4'>
                <img className='w-32' src={logo} alt="" />
            </div>
            <div className='flex justify-center h-36 text-center text-3xl md:text-5xl font-bold text-white '>
                <h1 className={`md:w-3/5 max-md:px-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                    {headings[headingIndex]}
                </h1>
            </div>
            <img src={circlebg} alt=""  className='z-0 absolute md:right-64 right-8 '/>
            <div className='flex justify-center w-full  p-4 rounded-xl mt-4'>
                <form className='z-10 bg-LightBlue md:w-1/2 rounded-lg md:p-4'>
                    
                        <div className='p-4'>
                        <label className='text-md font-semibold'>Name</label>
                        <input 
                        type="text" 
                        placeholder='Your Name' 
                        className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
                        />
                        </div>
                        
                    <div className='p-4'>
                    <label className='text-md font-semibold'>Email</label>
                    <input 
                    type="email" 
                    placeholder='Your Email' 
                    className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
                    />
                    </div>
                    <div className='p-4'>
                        
            <label className='text-md font-semibold' >Role</label>
            <select value={selectedRole} onChange={handleRoleChange}  className='rounded-lg text-xs h-fit w-full my-2 py-4 px-2'
>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Alumni">Alumni</option>
            </select>
                    </div>
                </form>
            </div>
            <img src={circlebg} alt=""  className='z-0 absolute bottom-24 left-20 w-24'/>

        </div>
    );
};

export default LandingPage;
