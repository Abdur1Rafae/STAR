import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LMTable from '../../components/Teacher/LMTable'
import OSummary from '../../components/Teacher/OSummary';


function LiveMonitoring() {

  return (
    <div className='flex flex-col h-full font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Live Monitoring"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Live Monitoring"}/>
                <div className='px-4 pt-4 flex flex-col'>
                    <OSummary/>
                </div>
                    <LMTable />

            </div>   
        </div>
    </div>
  );
}

export default LiveMonitoring;