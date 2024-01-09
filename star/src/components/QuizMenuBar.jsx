import React, { useState } from 'react'
import { FaUser, FaUserCog } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Timer from './Timer';


const QuizMenuBar = () => {

    return (
        <div className="container">
            <div className='menu-container w-screen lg:max-w-full h-14 bg-[#CAE0F9] flex items-center'>
                <div className='menubar w-full flex justify-between'>
                    <div className="menuleft logo flex justify-start">
                        <img src='./mindloom.png' className='w-10 ml-4 mr-2'></img>
                        <div className="h-full flex flex-col">
                            <div className='font-["Jockey_One"] font-[800] self-start mb-0'>mindLoom</div>
                            <div className='text-xs font-[600]'>Assess.Enhance.Excel</div>
                        </div>
                    </div>
                    <Timer initialTime={60 * 5} />
                </div> 
            </div>
        </div>
        
    )
}

export default QuizMenuBar