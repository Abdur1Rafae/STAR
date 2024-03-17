import React from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LMTable from '../../components/Teacher/LMTable'
import OverallSummary from '../../components/Teacher/OverallSummary';


function LiveMonitoring() {

  return (
    <div className=' w-full h-full font-body  border border-black '>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Live Monitoring"}/>
            <div className='w-full '>
                <Subheader name={"Live Monitoring"}/>
                <div className='px-4 pt-4 flex flex-col'>
                  <OverallSummary/>
                </div>
                  <LMTable />
            </div>   
        </div>
    </div>
  );
}

export default LiveMonitoring;