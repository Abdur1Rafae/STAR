import React, { useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import logo from './logo.png'
import {ClickOutsideFunc} from './ClickOutsideFunc';
import { UserLogout } from '../APIS/AuthAPI';

const MenuBar = () => {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    let [profileDialog, setProfileDialog] = useState(false);

    let handleAccountClick = () => {
        if (user.role === 'teacher') {
            window.location.assign('teacher-account');
        } else {
            window.location.assign('manage-account');
        }
    };
    let handleProfileClick = () => {
        setProfileDialog(true);
      };

  let closeProfile = ClickOutsideFunc(()=>{
    setProfileDialog(false);
  })

  let handleLogout = async() => {
    try {
        const res = await UserLogout()
        localStorage.removeItem('token')
        localStorage.removeItem('userDetails')
        window.location.assign('/login')
    } catch(err) {
        console.log(err)
    }
  }

    return (
        <div className="">
            <div className='menu-container w-full h-14 bg-DarkBlue flex items-center'>
                <div className='menubar w-full flex justify-between'>
                    <div className="leftContainer flex border-r-2 border-white w-full justify-between">
                        <div className="menuleft logo flex justify-start">
                            <img src={logo} className='w-44 h-14 mr-2'></img>
                        </div>
                    </div>
                    <div className="rightContainer flex">
                        <button className='ml-2 sm:ml-4 sm:mr-4 text-white flex w-26 lg:w-56' onClick={handleProfileClick}>
                            <div className="UserInfo w-full text-white whitespace-nowrap self-center flex flex-col">
                                <h1 className='text-xs self-start font-bold'>{user.name}</h1>
                                <h3 className='text-xs text-[#C5D86D] self-start font-semibold'>{user.role === 'teacher' ? 'Teacher' : 'Student'}</h3>
                            </div>
                            <MdKeyboardArrowDown className='text-3xl self-center'/>
                        </button>
                    </div>
                </div> 
            </div>
            <div ref={closeProfile} className={`dialogue z-20 absolute rounded-md border-2 right-0 bg-LightBlue transition-all ease-out duration-500 ${profileDialog ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                {profileDialog && (
                    <div className='h-20 dropdown-list w-36 lg:w-64 flex flex-col items-center justify-around'>
                        <div className='h-8 w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white' onClick={handleAccountClick}>
                            <FaUserCog className='self-center ml-4 text-lg'/>
                            <button className='ml-2'>Profile</button>
                        </div>
                        
                        <div className='h-8 w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white' onClick={handleLogout}>
                            <RiLogoutCircleRLine className='self-center ml-4 text-lg'/>
                            <button className='ml-2'>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default MenuBar;
