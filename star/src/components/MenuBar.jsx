import React, { useState } from 'react'
import { FaUser, FaUserCog } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";


const MenuBar = () => {
    let [profileDialog, setProfileDialog] = useState(false)
    let handleProfileClick = () => {
        setProfileDialog(!profileDialog)
    }

    return (
        <div className="container">
            <div className='menu-container w-full h-14 bg-[#CAE0F9] flex items-center'>
                <div className='menubar w-full flex justify-between'>
                    <div className="menuleft logo flex justify-start">
                        <img src='./mindloom.png' className='w-10 ml-4 mr-2'></img>
                        <div className="h-full flex flex-col">
                            <div className='font-["Jockey_One"] font-[800] self-start mb-0'>mindLoom</div>
                            <div className='text-xs font-[600]'>Assess.Enhance.Excel</div>
                        </div>
                    </div>
                    <button className='mr-2 self-center' onClick={handleProfileClick}><FaUser/></button>
                </div> 
            </div>
            <div className={`dialogue absolute right-2 bg-[#E7ECEF] transition ease-out duration-500 ${profileDialog ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                {profileDialog ? (
                    <div className='dropdown-list w-[120px] flex flex-col items-center' onClick={()=>window.location.assign('/user/profile')}>
                        <div className='w-full flex justify-around'>
                            <FaUserCog className='self-center'/>
                            <button>Profile</button>
                        </div>
                        
                        <div className='w-full flex justify-around'  onClick={()=>window.location.assign('/user/profile')}>
                            <RiLogoutCircleRLine className='self-center'/>
                            <button>Logout</button>
                        </div>
                    </div>
                ) :
                    <div className='h-0'></div>
                }
            </div>
        </div>
        
    )
}

export default MenuBar