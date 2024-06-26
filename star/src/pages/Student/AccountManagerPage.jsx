import React from 'react';
import AccountForm from '../../components/Student/AccountForm';
import Notifications from '../../components/Student/Notifications';
import { MdAccountBox } from "react-icons/md";
import SubmitButton from '../../components/button/SubmitButton';
import CancelButton from '../../components/button/CancelButton';
import DeleteButton from '../../components/button/DeleteButton';
import SubHeader from '../../components/Student/SubHeader';

const AccountManagerPage = () => {

    return (
        <>
            <SubHeader/>
            <div className="flex items-center justify-center  ">
                <div className="w-full">
                    <div className="bg-white p-8 items-center">
                        <div className='flex mb-6'>
                            <MdAccountBox size={42}/> <h1 className="text-2xl font-semibold ml-4">Account Settings</h1>
                        </div>

                        <h1 className='text-xl font-semibold'>Profile</h1>
                        <hr className="h-px my-4 border-[1px] border-black"></hr>

                        <AccountForm  />
                        <h1 className='text-xl font-semibold'>Notifications</h1>
                        <hr className="h-px my-4 border-[1px] border-black"></hr>

                        <Notifications />
                        <div className='flex justify-between mt-6'>
                            <div className='flex '>
                                <div className='pr-4'>
                                    <CancelButton label="Cancel"  />
                                </div>
                                <SubmitButton label="Save"  />
                            </div>
                            <DeleteButton label="Delete"  />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountManagerPage;
